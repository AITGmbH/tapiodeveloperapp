using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataHub: Hub
    {
        public Task JoinGroup(string machineId)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, machineId);
        }

        public Task LeaveGroup(string machineId)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, machineId);
        }
    }
}
