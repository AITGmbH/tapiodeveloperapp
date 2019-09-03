using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Newtonsoft.Json;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public class UserProfileService : IUserProfileService
    {

        private const string TargetUrl = "https://globaldisco.tapio.one";

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;
        public UserProfileService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentException(nameof(tokenProvider));
            _httpClient.BaseAddress = new Uri(TargetUrl);

        }

        public async Task<SubscriptionOverview> GetUserProfileAsync(string userEmail, CancellationToken cancellationToken)
        {
            using (var request = new HttpRequestMessage(HttpMethod.Get, $"/api/userProfile/{WebUtility.UrlEncode(userEmail)}"))
            {
                var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.GlobalDiscovery);
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                using (var profileMessage = await _httpClient.SendAsync(request, cancellationToken).ConfigureAwait(false))
                {
                    profileMessage.EnsureSuccessStatusCode();
                    string responseBody = await profileMessage.Content.ReadAsStringAsync().ConfigureAwait(false);

                    return JsonConvert.DeserializeObject<SubscriptionOverview>(responseBody, new JsonSerializerSettings
                    {
                        DateParseHandling = DateParseHandling.DateTimeOffset
                    });
                }
            }
        }
    }

    public interface IUserProfileService
    {
        Task<SubscriptionOverview> GetUserProfileAsync(string userEmail, CancellationToken cancellationToken);
    }
}
