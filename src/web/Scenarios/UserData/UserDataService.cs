using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Configurations;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Extensions.Options;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.UserData
{
    public sealed class UserDataService : IUserDataService
    {
        private readonly string _clientId;
        public UserDataService(IOptions<TapioCloudCredentials> options)
        {
            _clientId = options?.Value?.ClientId ?? throw new ArgumentNullException(nameof(options));
        }

        public string GetClientId() {
            return _clientId;
        }
    }

    public interface IUserDataService
    {
        string GetClientId();
    }
}
