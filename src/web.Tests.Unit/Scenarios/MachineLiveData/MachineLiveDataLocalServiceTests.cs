using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineLiveData
{
    public class MachineLiveDataLocalServiceTests
    {
        [Fact]
        public async Task Should_RegisterHubAndReceiveEvent_WithoutAnyExceptions()
        {
            var autoResetEvent = new AutoResetEvent(false);
            var callbackMock = new Mock<Func<string, MachineLiveDataContainer, Task>>();
            callbackMock.Setup(func => func(It.IsAny<string>(), It.IsAny<MachineLiveDataContainer>())).Callback(() => autoResetEvent.Set()).Returns(Task.CompletedTask);

            var service = new MachineLiveDataLocalService();

            await service.RegisterHubAsync();
            service.SetCallback(callbackMock.Object);

            Assert.True(autoResetEvent.WaitOne());
            callbackMock.Verify(func => func(It.IsAny<string>(), It.IsAny<MachineLiveDataContainer>()), Times.Once);
        }

        [Fact]
        public async Task Should_RegisterHubAndReceiveEvents2Times_WithoutAnyExceptions()
        {
            var autoResetEvent = new AutoResetEvent(false);
            var callbackMock = new Mock<Func<string, MachineLiveDataContainer, Task>>();
            callbackMock.Setup(func => func(It.IsAny<string>(), It.IsAny<MachineLiveDataContainer>())).Callback(() => autoResetEvent.Set()).Returns(Task.CompletedTask);

            var service = new MachineLiveDataLocalService();

            await service.RegisterHubAsync();
            service.SetCallback(callbackMock.Object);

            Assert.True(autoResetEvent.WaitOne());

            autoResetEvent.Reset();

            Assert.True(autoResetEvent.WaitOne());
            callbackMock.Verify(func => func(It.IsAny<string>(), It.IsAny<MachineLiveDataContainer>()), Times.Exactly(2));
        }

        [Fact]
        public async Task Should_RegisterHubAndReceiveEventAndStop_WithoutAnyExceptions()
        {
            var autoResetEvent = new AutoResetEvent(false);
            var callbackMock = new Mock<Func<string, MachineLiveDataContainer, Task>>();
            callbackMock.Setup(func => func(It.IsAny<string>(), It.IsAny<MachineLiveDataContainer>())).Callback(() => autoResetEvent.Set()).Returns(Task.CompletedTask);

            var service = new MachineLiveDataLocalService();

            await service.RegisterHubAsync();
            service.SetCallback(callbackMock.Object);

            Assert.True(autoResetEvent.WaitOne());

            autoResetEvent.Reset();
            await service.UnregisterHubAsync();

            Assert.False(autoResetEvent.WaitOne(6000));
            callbackMock.Verify(func => func(It.IsAny<string>(), It.IsAny<MachineLiveDataContainer>()), Times.Once);
        }
    }
}
