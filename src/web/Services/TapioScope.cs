using System;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    /// <summary>
    /// Provides the AAD scopes of tapio.
    /// </summary>
    public class TapioScope
    {
        private const string TapioCoreApiScope = "https://tapiousers.onmicrosoft.com/CoreApi/.default";
        private const string TapioGlobalDiscoveryScope = "https://tapiousers.onmicrosoft.com/GlobalDiscoveryService/.default";

        static TapioScope()
        {
            CoreApi = new TapioScope(TapioCoreApiScope);
            GlobalDiscovery = new TapioScope(TapioGlobalDiscoveryScope);
        }

        private TapioScope(string value)
        {
            Value = value ?? throw new ArgumentNullException(nameof(value));
        }

        /// <summary>
        /// Gets the the value of the scope.
        /// </summary>
        internal string Value { get; }

        /// <summary>
        /// Gets the scope for the core api.
        /// </summary>
        public static TapioScope CoreApi { get; }

        /// <summary>
        /// Gets the scope for the global discovery.
        /// </summary>
        public static TapioScope GlobalDiscovery { get; }
    }
}
