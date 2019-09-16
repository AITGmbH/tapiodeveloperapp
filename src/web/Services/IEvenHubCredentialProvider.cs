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
