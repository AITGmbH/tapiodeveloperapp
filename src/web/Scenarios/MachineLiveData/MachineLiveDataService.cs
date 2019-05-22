using System;
using System.Threading.Tasks;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataService : IMachineLiveDataService
    {
        private readonly IMachineLiveDataEventProcessorFactory _dataEventProcessorFactory;
        private readonly ILogger<MachineLiveDataService> _logger;
        private Func<string, MachineLiveDataContainer, Task> _callback;
        private IEventProcessorHostInterface _processorHost;
        private bool _readerEnabled;

        public MachineLiveDataService(IMachineLiveDataEventProcessorFactory dataEventProcessorFactory, ILogger<MachineLiveDataService> logger)
        {
            _dataEventProcessorFactory = dataEventProcessorFactory ?? throw new ArgumentNullException(nameof(dataEventProcessorFactory));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public bool IsReaderEnabled() => _readerEnabled;

        public async Task RegisterHubAsync()
        {
            if (IsReaderEnabled())
            {
                return;
            }

            if (_processorHost == null)
            {
                _logger.LogInformation("Create event processor host");
                _processorHost = _dataEventProcessorFactory.CreateEventProcessorHost();
            }

            _dataEventProcessorFactory.SetCallback(HandleProcessEventsAsync);

            var options = new EventProcessorOptions();
            options.SetExceptionHandler(e =>
            {
                _logger.LogWarning(e.Exception, "Error received from event processor. Action: {0} Hostname: {1} PartitionId: {2}", e.Action, e.Hostname, e.PartitionId);

            });
            _logger.LogInformation("Connect to azure event hub");
            await _processorHost.RegisterEventProcessorFactoryAsync(_dataEventProcessorFactory, options);
            _readerEnabled = true;
        }

        public void SetCallback(Func<string, MachineLiveDataContainer, Task> callback)
        {
            _callback = callback;
        }

        public async Task UnregisterHubAsync()
        {
            if (IsReaderEnabled())
            {
                _logger.LogInformation("Disconnect from azure event hub");
                await _processorHost.UnregisterEventProcessorAsync();
                _readerEnabled = false;
            }
        }

        private async Task HandleProcessEventsAsync(string data)
        {
            var result = MaterialLiveDataContainerExtension.FromJson(data);
            await _callback(result.MachineId, result);
        }
    }

    public interface IMachineLiveDataService
    {
        Task RegisterHubAsync();

        bool IsReaderEnabled();

        void SetCallback(Func<string, MachineLiveDataContainer, Task> callback);

        Task UnregisterHubAsync();
    }
}
