using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.HelperClasses;
using FluentAssertions;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit
{
    public class MachineOverviewServiceTests
    {
        private const string TapioMail = "some@mail.address";
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
            _standardTokenProviderMock.Setup(f => f.GetTapioEmail()).Returns(TapioMail);
        }

        [Fact]
        public async Task GetSubscriptionsAsync_ThrowsNoException()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var machineOverviewService = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                Func<Task<SubscriptionOverview>> action = () => machineOverviewService.GetSubscriptionsAsync(CancellationToken.None);
                await action.Should().NotThrowAsync();
            }
        }

        [Fact]
        public async Task GetSubscriptionsAsync_CallsServerExactlyOnce()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);

            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var machineOverviewService = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                await machineOverviewService.GetSubscriptionsAsync(CancellationToken.None);

                messageHandlerMock.VerifySendAsyncWasInvokedExactlyOnce();
            }
        }

        [Fact]
        public async Task GetSubscriptionsAsync_ThrowsExceptionWhenTapioReturnsErrorCode()
        {

            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Unauthorized, "{}");
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var machineOverviewService = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                Func<Task<SubscriptionOverview>> action = () => machineOverviewService.GetSubscriptionsAsync(CancellationToken.None);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }
    }
}
