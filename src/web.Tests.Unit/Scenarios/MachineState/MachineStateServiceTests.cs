using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using FluentAssertions;
using MaxKagamine.Moq.HttpClient;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineState
{
    public class MachineStateServiceTests
    {
        [Fact]
        public async Task GivenOneMachineWithoutData_WhenReceivingItsStates_ThenTheResult_ShouldBeEmpty()
        {
            // Given
            var tokenProviderMock = new Mock<ITokenProvider>();
            tokenProviderMock
                .Setup(tp => tp.ReceiveTokenAsync(It.IsAny<TapioScope>()))
                .ReturnsAsync("foo");

            var handler = new Mock<HttpMessageHandler>();
            handler
                .SetupRequest(HttpMethod.Post, "https://core.tapio.one/api/machines/state")
                .ReturnsResponse(HttpStatusCode.OK, new StringContent("[]", new UTF8Encoding(false)));

            var httpClient = handler.CreateClient();

            var cut = new MachineStateService(httpClient, tokenProviderMock.Object, Mock.Of<ILogger<MachineStateService>>());

            // When
            var result = await cut.GetMachineStateAsync("2f5b690df6c0406982d49fd9b7a8835b", CancellationToken.None);

            // Then
            result.Should().BeEmpty();
        }

        [Fact]
        public async Task GivenOneMachineWithoutData_WhenReceivingItsStates_ThenOneRequest_ShouldBeSent()
        {
            // Given
            var tokenProviderMock = new Mock<ITokenProvider>();
            tokenProviderMock
                .Setup(tp => tp.ReceiveTokenAsync(It.IsAny<TapioScope>()))
                .ReturnsAsync("foo");

            var handler = new Mock<HttpMessageHandler>();
            handler
                .SetupRequest(HttpMethod.Post, "https://core.tapio.one/api/machines/state")
                .ReturnsResponse(HttpStatusCode.OK, new StringContent("[]", new UTF8Encoding(false)))
                .Verifiable();

            var httpClient = handler.CreateClient();

            var cut = new MachineStateService(httpClient, tokenProviderMock.Object, Mock.Of<ILogger<MachineStateService>>());

            // When
            _ = await cut.GetMachineStateAsync("2f5b690df6c0406982d49fd9b7a8835b", CancellationToken.None);

            // Then
            handler.VerifyAnyRequest(Times.Once());
        }

        [Fact]
        public async Task GivenOneMachineWithThreeConditions_WhenReceivingItsStates_ThenTheResult_ShouldContainTheseConditions()
        {
            // Given
            var tokenProviderMock = new Mock<ITokenProvider>();
            tokenProviderMock
                .Setup(tp => tp.ReceiveTokenAsync(It.IsAny<TapioScope>()))
                .ReturnsAsync("foo");

            var responseContent = GetTestDataFromAssembly("SingleMachineWithSomeData.json");

            var handler = new Mock<HttpMessageHandler>();
            handler
                .SetupRequest(HttpMethod.Post, "https://core.tapio.one/api/machines/state")
                .ReturnsResponse(HttpStatusCode.OK, new StringContent(responseContent, new UTF8Encoding(false)))
                .Verifiable();

            var httpClient = handler.CreateClient();

            var cut = new MachineStateService(httpClient, tokenProviderMock.Object, Mock.Of<ILogger<MachineStateService>>());

            // When
            var result = await cut.GetMachineStateAsync("2f5b690df6c0406982d49fd9b7a8835b", CancellationToken.None);

            // Then
            result.Children().Should().HaveCount(3);
        }

        public static string GetTestDataFromAssembly(string name)
        {
            var resourceStream = typeof(MachineOverviewServiceTests).Assembly.GetManifestResourceStream(typeof(MachineOverviewServiceTests).Namespace + ".Scenarios.MachineState.Data." + name);
            using (var reader = new StreamReader(resourceStream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
