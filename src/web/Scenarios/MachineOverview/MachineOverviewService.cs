using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview
{
    public sealed class MachineOverviewService : IMachineOverviewService
    {
        private const string TapioGlobalDiscoSubscriptionOverview = "https://globaldisco.tapio.one/api/subscriptionOverview";

        private readonly HttpClient _httpClient;

        public MachineOverviewService(HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async Task<SubscriptionOverview> GetSubscriptionAsync(CancellationToken cancellationToken)
        {
            var requestUri = new Uri(TapioGlobalDiscoSubscriptionOverview);
            var responseMessage = await _httpClient
                .GetAsync(requestUri, cancellationToken);
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
