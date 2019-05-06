using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.LicenseOverview
{
    public sealed class LicenseOverviewService : ILicenseOverviewService
    {
        private const string GlobalDiscoSubscriptionOverview = "https://globaldisco.tapio.one/api/subscriptionOverview";
        private readonly Uri _globalDiscoSubscriptionOverviewRequest = new Uri(GlobalDiscoSubscriptionOverview);

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public LicenseOverviewService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<SubscriptionOverview> GetSubscriptionsAsync(CancellationToken cancellationToken)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.GlobalDiscovery);
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, _globalDiscoSubscriptionOverviewRequest);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync();
            var result = SubscriptionOverviewExtension.FromJson(content);
            return result;
        }
    }

    public interface ILicenseOverviewService
    {
        Task<SubscriptionOverview> GetSubscriptionsAsync(CancellationToken cancellationToken);
    }
}
