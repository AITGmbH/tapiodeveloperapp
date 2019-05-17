using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataService : IMachineLiveDataService
    {
        private readonly IMachineLiveDataEventProcessorFactory _dataEventProcessorFactory;
        private Func<string, dynamic, Task> _func;
        private IEventProcessorHostInterface _processorHost;
        private bool _readerEnabled;


        public MachineLiveDataService(IMachineLiveDataEventProcessorFactory dataEventProcessorFactory)
        {
            _dataEventProcessorFactory = dataEventProcessorFactory ?? throw new ArgumentNullException(nameof(dataEventProcessorFactory));
        }

        public bool IsReaderEnabled() => _readerEnabled;


        public async Task ReadHubAsync()
        {
            if (IsReaderEnabled())
            {
                return;
            }

            if (_processorHost == null)
            {
                _processorHost = _dataEventProcessorFactory.CreateEventProcessorHost();
            }

            _dataEventProcessorFactory.SetCallback(HandleProcessEventsAsync);

            var options = new EventProcessorOptions();
            options.SetExceptionHandler(e =>
            {
                Trace.TraceError(e.Exception.Message);
            });
            await _processorHost.RegisterEventProcessorFactoryAsync(_dataEventProcessorFactory, options);
            _readerEnabled = true;
        }

        public void SetCallback(Func<string, dynamic, Task> func)
        {
            _func = func;
        }

        public async Task UnregisterHubAsync()
        {
            if (IsReaderEnabled())
            {
                await _processorHost.UnregisterEventProcessorAsync();
                _readerEnabled = false;
            }
        }

        private async Task HandleProcessEventsAsync(string data)
        {
            var result = MaterialLiveDataContainerExtension.FromJson(data);
            await _func(result.MachineId, result);
        }
    }

    public interface IMachineLiveDataService
    {
        Task ReadHubAsync();

        bool IsReaderEnabled();

        void SetCallback(Func<string, dynamic, Task> func);

        Task UnregisterHubAsync();
    }



}
