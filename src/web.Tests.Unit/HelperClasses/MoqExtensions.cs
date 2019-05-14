
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using Moq.Protected;

namespace web.Tests.Unit.HelperClasses
{

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

        public static Mock<HttpMessageHandler> SetupSendAsyncMethod(this Mock<HttpMessageHandler> instance,
            HttpStatusCode statusCode, string content)
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
