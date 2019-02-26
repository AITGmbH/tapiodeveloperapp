using System;
using System.Threading;
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
        private const string TapioGlobalDiscoveryScope = "https://tapiousers.onmicrosoft.com/GlobalDiscoveryService/.default";
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

        public async Task<string> ReceiveTokenAsync(CancellationToken cancellationToken)
        {
            var authenticationResult = await _application.AcquireTokenForClientAsync(new[] { TapioGlobalDiscoveryScope });

            return authenticationResult.AccessToken;
        }
    }
}
