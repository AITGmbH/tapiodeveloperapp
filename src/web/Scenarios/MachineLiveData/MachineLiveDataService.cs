using System;
using System.Threading.Tasks;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataService : IMachineLiveDataService
    {
        private readonly IMachineLiveDataEventProcessorFactory _dataEventProcessorFactory;
        private readonly ILogger<MachineLiveDataService> _logger;
        private Func<string, MachineLiveDataContainer, Task> _callback;
        private IEventProcessorHost _processorHost;
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
            await _processorHost.RegisterEventProcessorFactoryAsync(_dataEventProcessorFactory, options).ConfigureAwait(false);
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
                await _processorHost.UnregisterEventProcessorAsync().ConfigureAwait(false);
                _readerEnabled = false;
            }
        }

        private async Task HandleProcessEventsAsync(string data)
        {
            var result = MaterialLiveDataContainerExtension.FromJson(data);
            if (_callback != null)
            {
                await _callback(result.MachineId, result).ConfigureAwait(false);
            }
        }
    }

    public interface IMachineLiveDataService
    {
        /// <summary>
        /// Creates a instance <see cref="IEventProcessorHost"/> to connect to azure resource using the provided instance of <see cref="IMachineLiveDataEventProcessorFactory"/>.
        /// </summary>
        /// <returns></returns>
        Task RegisterHubAsync();

        /// <summary>
        /// Gets the flage if the <see cref="MachineLiveDataService"/> is reading from the azure event hub.
        /// </summary>
        /// <returns></returns>
        bool IsReaderEnabled();

        /// <summary>
        /// Sets the callback for external useage of <see cref="IEventProcessor"/> ProcessEventsAsync callback method.
        /// </summary>
        /// <param name="callback">Callback function to be executed on reveiving new events.</param>
        void SetCallback(Func<string, MachineLiveDataContainer, Task> callback);

        /// <summary>
        /// Unregisters the <see cref="IEventProcessorHost"/>.
        /// </summary>
        /// <returns></returns>
        Task UnregisterHubAsync();
    }
}
