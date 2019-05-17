using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData;
using Microsoft.Azure.Amqp.Serialization;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineLiveData
{
    public class MachineLiveDataServiceTest
    {
        private readonly Mock<IMachineLiveDataEventProcessorFactory> _machineLiveDataEventProcessorFactoryMock;
        public MachineLiveDataServiceTest()
        {
            _machineLiveDataEventProcessorFactoryMock = new Mock<IMachineLiveDataEventProcessorFactory>();
        }


        [Fact]
        public async Task Should_ReadHubAsync_WithoutAnyExceptions()
        {
            var eventProcessorHostMock = new Mock<IEventProcessorHostInterface>();
            eventProcessorHostMock.Setup(ep => ep.RegisterEventProcessorFactoryAsync(It.IsAny<IEventProcessorFactory>(), It.IsAny<EventProcessorOptions>())).Returns(Task.CompletedTask);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.CreateEventProcessorHost()).Returns(eventProcessorHostMock.Object);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.SetCallback(It.IsAny<Func<string, Task>>()));
            var service = new MachineLiveDataService(_machineLiveDataEventProcessorFactoryMock.Object);

            await service.ReadHubAsync();

            Assert.True(service.IsReaderEnabled());
            eventProcessorHostMock.Verify(m => m.RegisterEventProcessorFactoryAsync(_machineLiveDataEventProcessorFactoryMock.Object, It.IsAny<EventProcessorOptions>()), Times.Once);
            _machineLiveDataEventProcessorFactoryMock.Verify(m => m.CreateEventProcessorHost(), Times.Once);
            _machineLiveDataEventProcessorFactoryMock.Verify(m => m.SetCallback(It.IsAny<Func<string, Task>>()), Times.Once);
        }

        [Fact]
        public async Task Should_ReadHubAsync_WithReaderEnabled()
        {
            var eventProcessorHostMock = new Mock<IEventProcessorHostInterface>();
            eventProcessorHostMock.Setup(ep => ep.RegisterEventProcessorFactoryAsync(It.IsAny<IEventProcessorFactory>(), It.IsAny<EventProcessorOptions>())).Returns(Task.CompletedTask);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.CreateEventProcessorHost()).Returns(eventProcessorHostMock.Object);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.SetCallback(It.IsAny<Func<string, Task>>()));
            var service = new MachineLiveDataService(_machineLiveDataEventProcessorFactoryMock.Object);

            await service.ReadHubAsync();
            await service.ReadHubAsync();

            Assert.True(service.IsReaderEnabled());
            eventProcessorHostMock.Verify(m => m.RegisterEventProcessorFactoryAsync(_machineLiveDataEventProcessorFactoryMock.Object, It.IsAny<EventProcessorOptions>()), Times.Once);
            _machineLiveDataEventProcessorFactoryMock.Verify(m => m.CreateEventProcessorHost(), Times.Once);
            _machineLiveDataEventProcessorFactoryMock.Verify(m => m.SetCallback(It.IsAny<Func<string, Task>>()), Times.Once);
        }

        [Fact]
        public async Task Should_UnregisterHubAsync_WithReaderEnabled()
        {
            var eventProcessorHostMock = new Mock<IEventProcessorHostInterface>();
            eventProcessorHostMock.Setup(ep => ep.RegisterEventProcessorFactoryAsync(It.IsAny<IEventProcessorFactory>(), It.IsAny<EventProcessorOptions>())).Returns(Task.CompletedTask);
            eventProcessorHostMock.Setup(ep => ep.UnregisterEventProcessorAsync()).Returns(Task.CompletedTask);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.CreateEventProcessorHost()).Returns(eventProcessorHostMock.Object);
            _machineLiveDataEventProcessorFactoryMock.Setup(f => f.SetCallback(It.IsAny<Func<string, Task>>()));
            var service = new MachineLiveDataService(_machineLiveDataEventProcessorFactoryMock.Object);

            await service.ReadHubAsync();
            await service.UnregisterHubAsync();

            Assert.False(service.IsReaderEnabled());
            eventProcessorHostMock.Verify(m => m.UnregisterEventProcessorAsync(), Times.Once);
        }

        [Fact]
        public async Task Should_UnregisterHubAsync_WithReaderDisabled()
        {
            var eventProcessorHostMock = new Mock<IEventProcessorHostInterface>();
            eventProcessorHostMock.Setup(ep => ep.UnregisterEventProcessorAsync()).Returns(Task.CompletedTask);
            var service = new MachineLiveDataService(_machineLiveDataEventProcessorFactoryMock.Object);

            await service.UnregisterHubAsync();

            Assert.False(service.IsReaderEnabled());
            eventProcessorHostMock.Verify(m => m.UnregisterEventProcessorAsync(), Times.Never);
        }
    }


}
