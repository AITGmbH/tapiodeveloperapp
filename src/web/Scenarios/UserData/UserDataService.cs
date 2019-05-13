using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.UserData
{
    public sealed class UserDataService : IUserDataService
    {
        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public UserDataService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }
    }

    public interface IUserDataService
    {
    }
}
