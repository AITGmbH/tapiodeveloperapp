using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Newtonsoft.Json;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataLocalService : IMachineLiveDataService
    {
        private EventGenerator _eventGenerator;
        private bool _isReaderEnabled;

        public Task RegisterHubAsync()
        {
            _eventGenerator = new EventGenerator();
            return Task.CompletedTask;
        }

        public bool IsReaderEnabled() => _isReaderEnabled;

        public void SetCallback(Func<string, MachineLiveDataContainer, Task> callback)
        {
            _eventGenerator.SetCallback(callback);
            _eventGenerator.Start();
            _isReaderEnabled = true;
        }

        public Task UnregisterHubAsync()
        {
            _eventGenerator.Stop();
            _isReaderEnabled = false;
            return Task.CompletedTask;
        }
    }

    public class EventGenerator
    {
        private Func<string, MachineLiveDataContainer, Task> _callback;
        private readonly Timer _timer;
        private readonly Random _random;

        private readonly List<string> _messageTypes = new List<string> { "cond", "itd" };
        private readonly string _machineName = "TestMachine";
        private readonly List<string> _providers = new List<string> { "provider1", "provider2", "provider3" };
        private readonly Dictionary<string, string> _keys = new Dictionary<string, string>
        {
            { "status1", null}, {"status2", null}, { "temperature1", "c"}, {"temperature2", "c"}, {"rotation1", "rpm"}, {"rotation2", "rpm"}
        };
        private readonly List<string> _sources = new List<string> { "source1", "source2", "source3" };
        private readonly List<string> _quality = new List<string> { "g", "b", "u" };


        public EventGenerator()
        {
            _random = new Random();
            _timer = new Timer(5000);
            _timer.Elapsed += GenerateEvent;
        }


        public void SetCallback(Func<string, MachineLiveDataContainer, Task> callback) => _callback = callback;
        public void Start() => _timer.Start();

        public void Stop() => _timer.Stop();


        private void GenerateEvent(object source, ElapsedEventArgs args)
        {
            var selectedType = _messageTypes[_random.Next(_messageTypes.Count)];
            dynamic messageContainer = new ExpandoObject();
            dynamic message = new ExpandoObject();

            messageContainer.tmid = _machineName;
            messageContainer.msgid = Guid.NewGuid().ToString();
            messageContainer.msgts = args.SignalTime;
            messageContainer.msgt = selectedType;

            message.p = _providers[_random.Next(_providers.Count)];
            var selectedKey = _keys.Keys.ToList()[_random.Next(_keys.Keys.ToList().Count)];
            var selectedKeyUnit = _keys[selectedKey];

            message.sts = args.SignalTime.AddSeconds(-_random.NextDouble());
            message.rts = args.SignalTime;

            if (selectedType == "itd")
            {
                message.k = selectedKey;
                message.u = _keys[selectedKey];
                message.vt = GetValueTypeForUnit(selectedKeyUnit);
                message.v = GetValueForUnit(selectedKeyUnit);
                message.q = _quality[_random.Next(_quality.Count)];
            }

            if (selectedType == "cond")
            {
                message.k = selectedKey;
                message.s = _sources[_random.Next(_sources.Count)];
                message.sv = _random.Next(0, 1000);

                message.ls = new ExpandoObject();
                message.lm = new ExpandoObject();

                message.ls.de = "Source 01-Deutsch";
                message.ls.en = "Source 01-English";

                message.lm.de = "Deutscher Text";
                message.lm.en = "English Text";

                message.vls = new ExpandoObject();
                message.vls.key1 = new ExpandoObject();

                message.vls.key1.t = GetValueTypeForUnit(selectedKeyUnit);
                message.vls.key1.t = GetValueForUnit(selectedKeyUnit);
            }

            messageContainer.msg = message;

            string jsonString = JsonConvert.SerializeObject(messageContainer).ToString();
            var container = MaterialLiveDataContainerExtension.FromJson(jsonString);

            _callback?.Invoke(container.MachineId, container);
        }

        private string GetValueTypeForUnit(string unit)
        {
            switch (unit)
            {
                case "c":
                    return "f";
                case "rpm":
                    return "i";
                default:
                    return "s";
            }
        }

        private dynamic GetValueForUnit(string unit)
        {
            switch (unit)
            {
                case "c":
                    return _random.Next(-15, 30) + _random.NextDouble();
                case "rpm":
                    return _random.Next(0, 12000);
                default:
                    return Guid.NewGuid();
            }
        }
    }

}
