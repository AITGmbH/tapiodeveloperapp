using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData;
using Microsoft.AspNetCore.Connections;
using Moq;
using Xunit;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Internal;
using Microsoft.Extensions.Logging;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineLiveData
{
    public class MachineLiveDataHubTests
    {
        [Fact]
        public async Task JoinGroupAsync_SpecificGroupName_ShouldJoin()
        {
            var groupName = "groupName";
            var hub = new MachineLiveDataHub();
            var groupManagerMock = new Mock<IGroupManager>();
            groupManagerMock.Setup(gm => gm.AddToGroupAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>())).Returns(Task.CompletedTask);
            hub.Groups = groupManagerMock.Object;
            var defaultConnectionContext = new DefaultConnectionContext();
            var hubConnectionContext = new HubConnectionContext(defaultConnectionContext, TimeSpan.MaxValue, new LoggerFactory());
            hub.Context = new DefaultHubCallerContext(hubConnectionContext);

            await hub.JoinGroup(groupName);

            groupManagerMock.Verify(gm => gm.AddToGroupAsync(hub.Context.ConnectionId, groupName, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task LeaveGroupAsync_SpecificGroupName_ShouldLeave()
        {
            var groupName = "groupName";
            var hub = new MachineLiveDataHub();
            var groupManagerMock = new Mock<IGroupManager>();
            groupManagerMock.Setup(gm => gm.RemoveFromGroupAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>())).Returns(Task.CompletedTask);
            hub.Groups = groupManagerMock.Object;
            var defaultConnectionContext = new DefaultConnectionContext();
            var hubConnectionContext = new HubConnectionContext(defaultConnectionContext, TimeSpan.MaxValue, new LoggerFactory());
            hub.Context = new DefaultHubCallerContext(hubConnectionContext);

            await hub.LeaveGroup(groupName);

            groupManagerMock.Verify(gm => gm.RemoveFromGroupAsync(hub.Context.ConnectionId, groupName, It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task OnConnectedAsync_ImplicitHubContext_ShouldAddConnection()
        {
            var hub = new MachineLiveDataHub();
            var defaultConnectionContext = new DefaultConnectionContext();
            var hubConnectionContext = new HubConnectionContext(defaultConnectionContext, TimeSpan.MaxValue, new LoggerFactory());
            hub.Context = new DefaultHubCallerContext(hubConnectionContext);

            await hub.OnConnectedAsync();

            Assert.Contains(hub.Context.ConnectionId, MachineLiveDataConnectionHandler.Connections);
        }

        [Fact]
        public async Task OnConnectedAsync_ImplicitHubContext_ShouldRemoveConnection()
        {
            var hub = new MachineLiveDataHub();
            var defaultConnectionContext = new DefaultConnectionContext();
            var hubConnectionContext = new HubConnectionContext(defaultConnectionContext, TimeSpan.MaxValue, new LoggerFactory());
            hub.Context = new DefaultHubCallerContext(hubConnectionContext);
            MachineLiveDataConnectionHandler.Connections.Add(hub.Context.ConnectionId);

            await hub.OnDisconnectedAsync(null);

            Assert.Empty(MachineLiveDataConnectionHandler.Connections);
        }
    }
}
