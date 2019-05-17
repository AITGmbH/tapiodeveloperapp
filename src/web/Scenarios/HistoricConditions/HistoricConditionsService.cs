using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricConditions
{
    public sealed class HistoricConditionsService : IHistoricConditionsService
    {
        private const string GetData = "https://core.tapio.one/api/machines/historic/tmids/{0}/conditions";
        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public HistoricConditionsService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }
        
        public Task<HistoricConditionsResponse> GetConditionsAsync(CancellationToken cancellationToken, string machineId)
        {
            return GetConditionsAsync(cancellationToken, machineId, new HistoricConditionsRequest
            {
                From = DateTime.Now.AddDays(-3)
            });
        }
        
        public async Task<HistoricConditionsResponse> GetConditionsAsync(CancellationToken cancellationToken, string machineId, HistoricConditionsRequest requestData)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
            var request = new HttpRequestMessage(HttpMethod.Post, new Uri(String.Format(GetData, machineId)));
            request.Content = new StringContent(HistoricConditionsRequestExtension.ToJson(requestData),Encoding.UTF8, "application/json");

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync();
            var result = HistoricConditionsResponseExtension.FromJson(content);
            return result;
        }
    }

    public interface IHistoricConditionsService
    {
        Task<HistoricConditionsResponse> GetConditionsAsync(CancellationToken cancellationToken, string machineId);
        Task<HistoricConditionsResponse> GetConditionsAsync(CancellationToken cancellationToken, string machineId, HistoricConditionsRequest requestData);
    }
}
