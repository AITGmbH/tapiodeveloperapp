using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview
{
    public sealed class MachineOverviewService : IMachineOverviewService
    {
        private const string TapioGlobalDiscoSubscriptionOverview = "https://globaldisco.tapio.one/api/subscriptionOverview";

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public MachineOverviewService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<SubscriptionOverview> GetSubscriptionAsync(CancellationToken cancellationToken)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(cancellationToken);
            var requestUri = new Uri(TapioGlobalDiscoSubscriptionOverview);
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, requestUri);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync();
            var result = SubscriptionOverviewExtension.FromJson(content);
            return result;
        }
    }

    public interface IMachineOverviewService
    {
        Task<SubscriptionOverview> GetSubscriptionAsync(CancellationToken cancellationToken);
    }
}
