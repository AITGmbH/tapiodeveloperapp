using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.HelperClasses;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Moq.Protected;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.MachineCommands
{
    public class MachineCommandsServiceTests
    {
        private const string TestTapioWriteResult = @"
            [
              {
                ""cloudConnectorId"": ""vAmCn1tXy2v0cTkgI48yFxdyzBF8TO_jVA1Mv0u4g1fK8bzcILQT8JJOZ9hNmzxv5-hoV4l81y5VRPIYUEs01A"",
                ""status"": 200,
                ""commandResponse"": [
                  {
                    ""statusCode"": 0
                  }
                ]
              }
            ]";
        public const string TestTapioReadResult = @"
            [
              {
                ""cloudConnectorId"": ""vAmCn1tXy2v0cTkgI48yFxdyzBF8TO_jVA1Mv0u4g1fK8bzcILQT8JJOZ9hNmzxv5-hoV4l81y5VRPIYUEs01A"",
                ""status"": 200,
                ""commandResponse"": [
                  {
                    ""statusCode"": 0,
                    ""outArguments"": {
                      ""value"": {
                        ""valueType"": ""Float"",
                        ""value"": ""12""
                      }
            }
                  }
                ]
              }
            ]";
        private readonly Mock<ITokenProvider> _standardTokenProviderMock;
        private readonly Mock<ILogger<MachineCommandsService>> _loggerMock;

        public MachineCommandsServiceTests()
        {
            _standardTokenProviderMock = new Mock<ITokenProvider>();
            _loggerMock = new Mock<ILogger<MachineCommandsService>>();
        }

        [Fact]
        public async Task GetAvailableCommands_ReturnsCommands()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, "{}");
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);
                var commands = service.GetCommands();
                commands.Should().HaveCount(4);
            }
        }

        [Fact]
        public async Task ExecuteItemReadAsync_ThrowNoException()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, TestTapioReadResult);
            var commandItemRead = new CommandItemRead() {
                Id = "Kante!Heizung01.State-Read",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);

                Func<Task<IEnumerable<CommandResponse>>> action = () =>
                    service.ExecuteItemReadAsync(commandItemRead, CancellationToken.None);
                await action.Should().NotThrowAsync();
            }
        }

        [Fact]
        public async Task ExecuteItemReadAsync_ThrowExceptionWhenTapioReturnsConflict()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Conflict, "{}");
            var commandItemRead = new CommandItemRead() {
                Id = "Kante!Heizung01.State-Read",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);

                Func<Task<IEnumerable<CommandResponse>>> action = () =>
                    service.ExecuteItemReadAsync(commandItemRead, CancellationToken.None);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }

        [Fact]
        public async Task ExecuteItemWriteAsync_ThrowNoException()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, TestTapioWriteResult);
            var commandItemWrite = new CommandItemWrite() {
                Id = "Kante!Heizung01.Value-Write",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };
            commandItemWrite.AddInArgument("Float", 12, "value");

            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);

                Func<Task<IEnumerable<CommandResponse>>> action = () =>
                    service.ExecuteItemWriteAsync(commandItemWrite, CancellationToken.None);
                await action.Should().NotThrowAsync();
            }
        }

        [Fact]
        public async Task ExecuteItemWriteAsync_ThrowExceptionWhenTapioReturnsConflict()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Conflict, "{}");

            var commandItemWrite = new CommandItemWrite() {
                Id = "Kante!Heizung01.Value-Write",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };
            commandItemWrite.AddInArgument("Float", 12, "value");

            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);

                Func<Task<IEnumerable<CommandResponse>>> action = () =>
                    service.ExecuteItemWriteAsync(commandItemWrite, CancellationToken.None);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }

        [Fact]
        public async Task ExecuteItemWriteAsync_ReplaceCommandAndFallbackZero()
        {
            var expectedHttpRequestContent = "{\"id\":\"Kante!Heizung01.Value-Write\",\"tmid\":\"2f5b690df6c0406982d49fd9b7a8835b\",\"serverId\":\"Simu2\",\"commandType\":\"itemWrite\",\"inArguments\":{\"value\":{\"valueType\":\"Float\",\"value\":0.0}}}";
            var actualHttpRequestContent = string.Empty;
            var messageHandlerMock = new Mock<HttpMessageHandler>();
            messageHandlerMock.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>()).Callback<HttpRequestMessage, CancellationToken>(async (ms, cc) => {
                    actualHttpRequestContent = await ms.Content.ReadAsStringAsync();
                })
                .ReturnsAsync(new HttpResponseMessage {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(TestTapioWriteResult)
                });

            var commandItemWrite = new CommandItemWrite() {
                Id = "Kante!Heizung01.Value-Write",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };
            commandItemWrite.AddInArgument("Float", "abcd", "value");

            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);

                Func<Task<IEnumerable<CommandResponse>>> action = () =>
                    service.ExecuteItemWriteAsync(commandItemWrite, CancellationToken.None);
                await action.Should().NotThrowAsync();

                actualHttpRequestContent.Should().Be(expectedHttpRequestContent);
            }
        }

        [Fact]
        public async Task ExecuteItemWriteAsync_ReplaceCommandWithValue()
        {
            var expectedHttpRequestContent = "{\"id\":\"Kante!Heizung01.Value-Write\",\"tmid\":\"2f5b690df6c0406982d49fd9b7a8835b\",\"serverId\":\"Simu2\",\"commandType\":\"itemWrite\",\"inArguments\":{\"value\":{\"valueType\":\"Float\",\"value\":123.0}}}";
            var actualHttpRequestContent = string.Empty;
            var messageHandlerMock = new Mock<HttpMessageHandler>();
            messageHandlerMock.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>()).Callback<HttpRequestMessage, CancellationToken>(async (ms, cc) => {
                    actualHttpRequestContent = await ms.Content.ReadAsStringAsync();
                })
                .ReturnsAsync(new HttpResponseMessage {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(TestTapioWriteResult)
                });

            var commandItemWrite = new CommandItemWrite() {
                Id = "Kante!Heizung01.Value-Write",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };
            commandItemWrite.AddInArgument("Float", 123, "value");

            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var service = new MachineCommandsService(httpClient, _standardTokenProviderMock.Object, _loggerMock.Object);

                Func<Task<IEnumerable<CommandResponse>>> action = () =>
                    service.ExecuteItemWriteAsync(commandItemWrite, CancellationToken.None);
                await action.Should().NotThrowAsync();

                actualHttpRequestContent.Should().Be(expectedHttpRequestContent);
            }
        }
    }
}
