using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.LicenseOverview
{
    public sealed class LicenseOverviewService : ILicenseOverviewService
    {
#pragma warning disable S1075 // URIs should not be hardcoded
        private const string TargetUrl = "https://globaldisco.tapio.one";
#pragma warning restore S1075 // URIs should not be hardcoded
        private const string TargetRoute = "/api/userProfile/";
       

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;
        private readonly string _tapioEmail;

        public LicenseOverviewService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _tapioEmail = tokenProvider.GetTapioEmail() ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<SubscriptionOverview> GetSubscriptionsAsync(CancellationToken cancellationToken)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.GlobalDiscovery);
            var request = new HttpRequestMessage(HttpMethod.Get, new Uri($"{TargetUrl}{TargetRoute}{WebUtility.UrlEncode(_tapioEmail)}"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken).ConfigureAwait(false);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
            var result = SubscriptionOverviewExtension.FromJson(content);
            return result;
        }
    }

    public interface ILicenseOverviewService
    {
        Task<SubscriptionOverview> GetSubscriptionsAsync(CancellationToken cancellationToken);
    }
}
