using System;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineLiveData
{
    public class MachineLiveDataServiceTests
    {
        private readonly Mock<IMachineLiveDataEventProcessorFactory> _machineLiveDataEventProcessorFactoryMock;
        private readonly  Mock<ILogger<MachineLiveDataService>> _loggerMock;
        public MachineLiveDataServiceTests()
        {
            _machineLiveDataEventProcessorFactoryMock = new Mock<IMachineLiveDataEventProcessorFactory>();
            _loggerMock = new Mock<ILogger<MachineLiveDataService>>();
        }

        [Fact]
        public async Task Should_ReadHubAsync_WithoutAnyExceptions()
        {
            var hubContextMock = new Mock<IHubContext<MachineLiveDataHub>>();
            var eventProcessorHostMock = new Mock<IEventProcessorHost>();
            eventProcessorHostMock.Setup(ep => ep.RegisterEventProcessorFactoryAsync(It.IsAny<IEventProcessorFactory>(), It.IsAny<EventProcessorOptions>())).Returns(Task.CompletedTask);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.CreateEventProcessorHost()).Returns(eventProcessorHostMock.Object);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.SetCallback(It.IsAny<Func<string, Task>>()));
            var service = new MachineLiveDataService(hubContextMock.Object, _machineLiveDataEventProcessorFactoryMock.Object, _loggerMock.Object);

            await service.RegisterHubAsync();

            eventProcessorHostMock.Verify(m => m.RegisterEventProcessorFactoryAsync(_machineLiveDataEventProcessorFactoryMock.Object, It.IsAny<EventProcessorOptions>()), Times.Once);
            _machineLiveDataEventProcessorFactoryMock.Verify(m => m.CreateEventProcessorHost(), Times.Once);
            _machineLiveDataEventProcessorFactoryMock.Verify(m => m.SetCallback(It.IsAny<Func<string, Task>>()), Times.Once);
        }
    }
}
