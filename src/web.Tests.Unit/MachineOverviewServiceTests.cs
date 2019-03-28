using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using FluentAssertions;
using Moq;
using Moq.Protected;
using Xunit;

namespace web.Tests.Unit
{
    public class MachineOverviewServiceTests
    {
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

        private readonly Mock<ITokenProvider> _standardTokenProviderMock;

        public MachineOverviewServiceTests()
        {
            _standardTokenProviderMock = new Mock<ITokenProvider>();
            _standardTokenProviderMock.Setup(tk => tk.ReceiveTokenAsync(TapioScope.GlobalDiscovery)).ReturnsAsync("");
        }

        [Fact]
        public async Task GivenOneSimpleCall_WhenInvoking_ThenNoException_ShouldBeThrown()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var cut = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                Func<Task<SubscriptionOverview>> action = () => cut.GetSubscriptionAsync(CancellationToken.None);
                await action.Should().NotThrowAsync();
            }
        }

        [Fact]
        public async Task GivenOneSimpleCall_WhenInvoking_ThenTheServer_ShouldBeCalledExactlyOnce()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);

            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var cut = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                await cut.GetSubscriptionAsync(CancellationToken.None);

                messageHandlerMock.VerifySendAsyncWasInvokedExactlyOnce();
            }
        }

        [Fact]
        public async Task GivenOneUnauthorizedClient_WhenInvoking_ThenOneException_ShouldBeThrown()
        {

            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Unauthorized, "{}");
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var cut = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                Func<Task<SubscriptionOverview>> action = () => cut.GetSubscriptionAsync(CancellationToken.None);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }
    }

    public static class MoqExtensions
    {
        private const string SendAsyncMethodName = "SendAsync";

        public static void VerifySendAsyncWasInvokedExactlyOnce(this Mock<HttpMessageHandler> instance)
        {
            instance.Protected().Verify(
                SendAsyncMethodName,
                Times.Exactly(1),
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            );
        }

        public static Mock<HttpMessageHandler> SetupSendAsyncMethod(this Mock<HttpMessageHandler> instance, HttpStatusCode statusCode, string content)
        {
            instance.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    SendAsyncMethodName,
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage {
                    StatusCode = statusCode,
                    Content = new StringContent(content)
                })
                .Verifiable();
            return instance;
        }
    }
}
