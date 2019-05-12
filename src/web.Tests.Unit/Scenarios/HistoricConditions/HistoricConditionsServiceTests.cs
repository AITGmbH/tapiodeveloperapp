using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricConditions;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using FluentAssertions;
using Moq;
using web.Tests.Unit;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.HistoricConditions
{
    public class HistoricConditionsServiceTests
    {
        private readonly Mock<ITokenProvider> _standardTokenProviderMock;

        public HistoricConditionsServiceTests()
        {
            _standardTokenProviderMock = new Mock<ITokenProvider>();
        }

        [Fact]
        public async Task ReadConditionsAsync_ThrowNoException()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, "{}");
            const string testMachineId = "TestMachineId";
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new HistoricConditionsService(httpClient, _standardTokenProviderMock.Object);
                Func<Task<HistoricConditionsResponse>> action = () =>
                    service.ReadConditionsAsync(CancellationToken.None, testMachineId);
                await action.Should().NotThrowAsync();
            }
        }

        [Fact]
        public async Task ReadConditionsAsync_ThrowHttpExceptionBecauseOfUnauthorized()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Unauthorized, "{}");
            const string testMachineId = "TestMachineId";
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new HistoricConditionsService(httpClient, _standardTokenProviderMock.Object);
                Func<Task<HistoricConditionsResponse>> action = () =>
                    service.ReadConditionsAsync(CancellationToken.None, testMachineId);
                await action.Should().ThrowAsync<Exception>();
            }
        }
    }
}
