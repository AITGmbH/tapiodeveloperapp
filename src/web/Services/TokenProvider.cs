using System;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Configurations;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public class TokenProvider : ITokenProvider
    {
#pragma warning disable S1075 // URIs should not be hardcoded
        private const string RedirectUri = "http://example.com";
#pragma warning restore S1075 // URIs should not be hardcoded

        private readonly ConfidentialClientApplication _application;

        public TokenProvider(IOptions<TapioCloudCredentials> options)
        {
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }

            var clientCredential = new ClientCredential(options.Value.ClientSecret);
            _application = new ConfidentialClientApplication(options.Value.ClientId, RedirectUri, clientCredential, null, new TokenCache());
        }

        public Task<string> ReceiveTokenAsync<TScope>(TScope scope)
            where TScope : TapioScope
        {
            if (scope == null)
            {
                throw new ArgumentNullException(nameof(scope));
            }

            return ReceiveTokenInternalAsync(scope);
        }

        private async Task<string> ReceiveTokenInternalAsync<TScope>(TScope scope)
            where TScope : TapioScope
        {
            var scopeValue = scope.Value;
            var authenticationResult = await _application.AcquireTokenForClientAsync(new[] { scopeValue });

            return authenticationResult.AccessToken;
        }
    }
}
