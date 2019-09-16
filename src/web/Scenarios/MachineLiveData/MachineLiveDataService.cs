using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataService : IMachineLiveDataService
    {
        private readonly IMachineLiveDataEventProcessorFactory _dataEventProcessorFactory;
        private readonly ILogger<MachineLiveDataService> _logger;
        private readonly IHubContext<MachineLiveDataHub> _hub;
        private IEventProcessorHost _processorHost;
        private bool _isRegistered;

        public MachineLiveDataService(IHubContext<MachineLiveDataHub> hub, IMachineLiveDataEventProcessorFactory dataEventProcessorFactory, ILogger<MachineLiveDataService> logger)
        {
            _dataEventProcessorFactory = dataEventProcessorFactory ?? throw new ArgumentNullException(nameof(dataEventProcessorFactory));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
        }

        public async Task RegisterHubAsync()
        {
            if (_isRegistered)
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
            _isRegistered = true;
        }

        private async Task HandleProcessEventsAsync(string data)
        {
            var result = MaterialLiveDataContainerExtension.FromJson(data);
            await _hub.Clients
                    .Group(result.MachineId)
                    .SendAsync("streamMachineData", result)
                    .ConfigureAwait(false);
        }
    }

    public interface IMachineLiveDataService
    {
        /// <summary>
        /// Creates a instance <see cref="IEventProcessorHost"/> to connect to azure resource using the provided instance of <see cref="IMachineLiveDataEventProcessorFactory"/>.
        /// </summary>
        /// <returns></returns>
        Task RegisterHubAsync();
    }
}
