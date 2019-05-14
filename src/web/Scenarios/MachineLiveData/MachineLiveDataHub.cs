using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataHub: Hub
    {
        private readonly IList<string> _clients = new List<string>();
        private readonly IMachineLiveDataService _machineLiveDataService;

        public MachineLiveDataHub(IMachineLiveDataService machineLiveDataService)
        {
            _machineLiveDataService = machineLiveDataService;
        }

        public override async Task OnConnectedAsync()
        {
            _clients.Add(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _clients.Remove(Context.ConnectionId);
            if (!_clients.Any())
            {
                //await _machineLiveDataService.UnregisterHubAsync();
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}
