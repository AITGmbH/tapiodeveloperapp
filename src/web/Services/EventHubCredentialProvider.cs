using Aitgmbh.Tapio.Developerapp.Web.Configurations;
using Microsoft.Extensions.Options;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public class EventHubCredentialProvider: IEvenHubCredentialProvider
    {
        private readonly IOptions<EventHubCredentials> _options;

        public EventHubCredentialProvider(IOptions<EventHubCredentials> options)
        {
            _options = options;
        }

        public string GetEventHubEntityPath() => _options.Value.EventHubEntityPath;

        public string GetEventHubConnectionString() => _options.Value.EventHubConnectionString;

        public string GetStorageConnectionString() => _options.Value.StorageConnectionString;

        public string GetStorageContainerName() => _options.Value.StorageContainerName;
    }
}
