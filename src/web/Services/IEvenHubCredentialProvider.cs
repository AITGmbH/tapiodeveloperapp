using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public interface IEvenHubCredentialProvider
    {
        string GetEventHubEntityPath();
        string GetEventHubConnectionString();
        string GetStorageConnectionString();
        string GetStorageContainerName();
    }
}
