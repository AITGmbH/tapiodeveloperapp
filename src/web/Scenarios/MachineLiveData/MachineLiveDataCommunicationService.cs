using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataCommunicationService : IMachineLiveDataCommunicationService
    {
        private readonly IHubContext<MachineLiveDataHub> _hub;
        private readonly IMachineLiveDataService _machineLiveDataService;

        public MachineLiveDataCommunicationService(IHubContext<MachineLiveDataHub> hub, IMachineLiveDataService machineLiveDataService)
        {
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
            _machineLiveDataService = machineLiveDataService ?? throw new ArgumentNullException(nameof(machineLiveDataService));
        }

        public void RegisterCallback()
        {
            _machineLiveDataService.SetCallback(SendAsync);

        }
        private async Task SendAsync(string machineId, MachineLiveDataContainer data)
        {
            await _hub.Clients.Group(machineId).SendAsync("streamMachineData", data).ConfigureAwait(false);
        }
    }

    public interface IMachineLiveDataCommunicationService
    {
        /// <summary>
        /// Registers the callback for communication service to publish events to signalr connections.
        /// </summary>
        void RegisterCallback();
    }
}
