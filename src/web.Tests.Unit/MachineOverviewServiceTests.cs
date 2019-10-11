using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.HelperClasses;
using FluentAssertions;
using Moq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        private readonly Mock<IMachineStateService> _machineStateServiceMock;

        public MachineOverviewServiceTests()
        {
            var ct = new CancellationToken();
            _standardTokenProviderMock = new Mock<ITokenProvider>();
            _standardTokenProviderMock.Setup(f => f.GetTapioEmail()).Returns(TapioMail);
            _machineStateServiceMock = new Mock<IMachineStateService>();
            _machineStateServiceMock.Setup(
                machineStateService => machineStateService.GetMachineStateAsync(
                    It.IsAny<string>(),
                    ct
                )
            ).Returns(async () => {
                using (var streamReader = GetTestDataFromAssembly("SingleMachineWithSomeData.json"))
                using (var jsonReader = new JsonTextReader(streamReader))
                {
                    var array = await JArray.LoadAsync(jsonReader, ct);
                    var result = array.HasValues ? array.Descendants().First() : new JObject();
                    return result;
                }
            }
            );
        }

        [Fact]
        public async Task GetSubscriptionsAsync_ThrowsNoException()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var machineOverviewService = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);
                Func<Task<SubscriptionOverview>> action = () => machineOverviewService.GetSubscriptionsAsync(CancellationToken.None, _machineStateServiceMock.Object);
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
                await machineOverviewService.GetSubscriptionsAsync(CancellationToken.None, _machineStateServiceMock.Object);

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
                Func<Task<SubscriptionOverview>> action = () => machineOverviewService.GetSubscriptionsAsync(CancellationToken.None, _machineStateServiceMock.Object);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }

        [Fact]
        public async Task GetSubscriptionsAsync_TestMachineStateRunning()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var machineOverviewService = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);

                var result = await machineOverviewService.GetSubscriptionsAsync(CancellationToken.None, _machineStateServiceMock.Object);
                result.Subscriptions[0].AssignedMachines.Should().HaveCount(3);
                result.Subscriptions[0].AssignedMachines[0].MachineState.Should().Be(MachineState.Running);
                result.Subscriptions[0].AssignedMachines[1].MachineState.Should().Be(MachineState.Running);
                result.Subscriptions[0].AssignedMachines[2].MachineState.Should().Be(MachineState.Running);
            }
        }

        [Fact]
        public async Task GetSubscriptionsAsync_TestMachineStateOffline()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, Content);
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var machineOverviewService = new MachineOverviewService(httpClient, _standardTokenProviderMock.Object);
                var ct = new CancellationToken();
                _machineStateServiceMock.Setup(
                    machineStateService => machineStateService.GetMachineStateAsync(
                        It.IsAny<string>(),
                        ct
                    )
                ).Returns(() => Task.FromResult(JToken.FromObject(new JObject())));

                var result = await machineOverviewService.GetSubscriptionsAsync(CancellationToken.None, _machineStateServiceMock.Object);
                result.Subscriptions[0].AssignedMachines.Should().HaveCount(3);
                result.Subscriptions[0].AssignedMachines[0].MachineState.Should().Be(MachineState.Offline);
                result.Subscriptions[0].AssignedMachines[1].MachineState.Should().Be(MachineState.Offline);
                result.Subscriptions[0].AssignedMachines[2].MachineState.Should().Be(MachineState.Offline);
            }
        }


        public static StreamReader GetTestDataFromAssembly(string name)
        {
            var resourceStream = typeof(MachineOverviewServiceTests).Assembly.GetManifestResourceStream(typeof(MachineOverviewServiceTests).Namespace + ".Scenarios.MachineState.Data." + name);
            return new StreamReader(resourceStream ?? throw new InvalidOperationException(), Encoding.UTF8);
        }
    }
}
