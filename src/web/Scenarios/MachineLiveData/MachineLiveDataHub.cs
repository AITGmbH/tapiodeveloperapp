using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataHub : Hub
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName).ConfigureAwait(false);
        }

        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName).ConfigureAwait(false);
        }
    }
}
