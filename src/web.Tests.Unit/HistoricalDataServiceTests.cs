using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricalData;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using FluentAssertions;
using Moq;
using web.Tests.Unit.HelperClasses;
using Xunit;

namespace web.Tests.Unit
{
    public class HistoricalDataServiceTests
    {
        private readonly Mock<ITokenProvider> _standardTokenProviderMock;

        

        private const string Content = @"{
            ""totalCount"": 2,
            ""subscriptions"": [
            {
                ""licenses"": [
                {
                    ""licenseId"": ""aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"",
                    ""applicationId"": ""aaaabbbb-bbbb-cccc-dddd-eeeeeeeeeeee"",
                    ""createdDate"": ""2018-06-29T12:25:02.8346154+00:00"",
                    ""billingStartDate"": ""2018-11-29T12:25:02.8346154+00:00"",
                    ""billingInterval"": ""P1M"",
                    ""licenseCount"": 999
                }
                ],
                ""subscriptionId"": ""00000000-0000-0000-0000-000000000006"",
                ""name"": ""BVT core Subscription"",
                ""tapioId"": ""BVT core Subscription"",
                ""assignedMachines"": [
                {
                    ""tmid"": ""BVT1000004"",
                    ""displayName"": ""BVTMachine44""
                },
                {
                    ""tmid"": ""BVT1000002"",
                    ""displayName"": ""BVTMachine22""
                },
                {
                    ""tmid"": ""BVT1000003"",
                    ""displayName"": ""BVTMachine33""
                }
                ],
                ""subscriptionTypes"": [
                ""Customer""
                    ]
            }]}";

        public HistoricalDataServiceTests()
        {
            _standardTokenProviderMock = new Mock<ITokenProvider>();
            _standardTokenProviderMock.Setup(tk => tk.ReceiveTokenAsync(TapioScope.CoreApi)).ReturnsAsync("");
        }

        [Fact]
        public async Task ReadSourceKeysAsync_ThrowNoException()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);
            var sourceKeyResponseMock = new Mock<SourceKeyResponse>();
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new HistoricalDataService(httpClient, _standardTokenProviderMock.Object);
                Func<Task<SourceKeyResponse>> action = () => service.ReadSourceKeysAsync(CancellationToken.None, sourceKeyResponseMock.Object.MachineId);
                await action.Should().NotThrowAsync();
            }
        }

        [Fact]
        public async Task ReadSourceKeysAsync_ThrowHttpExceptionBecauseOfUnauthorized()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Unauthorized, "{}");
            var sourceKeyResponseMock = new Mock<SourceKeyResponse>();
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new HistoricalDataService(httpClient, _standardTokenProviderMock.Object);
                Func<Task<SourceKeyResponse>> action = () => service.ReadSourceKeysAsync(CancellationToken.None, sourceKeyResponseMock.Object.MachineId);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }
    }
}
