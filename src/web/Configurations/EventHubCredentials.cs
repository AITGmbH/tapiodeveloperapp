using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aitgmbh.Tapio.Developerapp.Web.Configurations
{
    public class EventHubCredentials
    {
        public string EventHubEntityPath { get; set; }

        public string EventHubConnectionString { get; set; }

        public string StorageContainerName { get; set; }

        public string StorageConnectionString { get; set; }
    }
}
