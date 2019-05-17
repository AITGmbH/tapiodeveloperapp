using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataHub : Hub, IMachineLiveDataHub
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public override async Task OnConnectedAsync()
        {
            MachineLiveDataConnectionHandler.Connections.Add(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            MachineLiveDataConnectionHandler.Connections.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }

    public interface IMachineLiveDataHub
    {
        Task JoinGroup(string groupName);
        Task LeaveGroup(string groupName);
        Task OnConnectedAsync();
        Task OnDisconnectedAsync(Exception exception);
    }

    public static class MachineLiveDataConnectionHandler
    {
        public static HashSet<string> Connections { get; } = new HashSet<string>();
    }
}
