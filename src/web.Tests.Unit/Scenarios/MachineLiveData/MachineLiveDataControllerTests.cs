using System;
using System.Net;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData;
using Microsoft.AspNetCore.SignalR;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineLiveData
{
    public class MachineLiveDataControllerTests
    {
        private readonly Mock<IHubContext<MachineLiveDataHub>> _hubMock;
        private readonly Mock<IMachineLiveDataService> _machineLiveDataServiceMock;

        public MachineLiveDataControllerTests()
        {
            _hubMock = new Mock<IHubContext<MachineLiveDataHub>>();
            _machineLiveDataServiceMock = new Mock<IMachineLiveDataService>();
        }

        [Fact]
        public async Task Get_WhenCalled_ReturnsStatusCodeOk()
        {
            _machineLiveDataServiceMock.Setup(e => e.RegisterHubAsync()).Returns(Task.CompletedTask);
            _machineLiveDataServiceMock.Setup(e => e.SetCallback(It.IsAny<Func<string, dynamic, Task>>()));
            var controller = new MachineLiveDataController(_hubMock.Object, _machineLiveDataServiceMock.Object);

            var result = await controller.Get();

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
        }
        [Fact]
        public async Task Get_WhenCalled_ReturnsStatusCodeInternalServerError()
        {
            _machineLiveDataServiceMock.Setup(e => e.RegisterHubAsync()).Throws(new Exception("some-exception"));
            _machineLiveDataServiceMock.Setup(e => e.SetCallback(It.IsAny<Func<string, dynamic, Task>>()));
            var controller = new MachineLiveDataController(_hubMock.Object, _machineLiveDataServiceMock.Object);

            var result = await controller.Get();

            Assert.Equal(HttpStatusCode.InternalServerError, result.StatusCode);
        }
    }
}
