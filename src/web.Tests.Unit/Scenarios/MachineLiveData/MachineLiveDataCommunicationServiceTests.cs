using System;
using System.Net;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData;
using Microsoft.AspNetCore.SignalR;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineLiveData
{
    public class MachineLiveDataCommunicationServiceTests
    {
        private readonly Mock<IHubContext<MachineLiveDataHub>> _hubMock;
        private readonly Mock<IMachineLiveDataService> _machineLiveDataServiceMock;

        public MachineLiveDataCommunicationServiceTests()
        {
            _hubMock = new Mock<IHubContext<MachineLiveDataHub>>();
            _machineLiveDataServiceMock = new Mock<IMachineLiveDataService>();
        }

        [Fact]
        public async Task RegisterCallback_WhenCalled_CallsThrough()
        {
            _machineLiveDataServiceMock.Setup(e => e.RegisterHubAsync()).Returns(Task.CompletedTask);
            _machineLiveDataServiceMock.Setup(e => e.SetCallback(It.IsAny<Func<string, MachineLiveDataContainer, Task>>()));
            var service = new MachineLiveDataCommunicationService(_hubMock.Object, _machineLiveDataServiceMock.Object);

            service.RegisterCallback();
            _machineLiveDataServiceMock.Verify(m => m.SetCallback(It.IsAny<Func<string, MachineLiveDataContainer, Task>>()), Times.Once);
        }
    }
}
