using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricalData
{
    public sealed class HistoricalDataService : IHistoricalDataService
    {
        private const string GetMachineSourceKeys =
            "https://core.tapio.one/api/machines/historic/tmids/{0}/items/keys";
        private const string GetHistoricalData =
            "https://core.tapio.one/api/machines/historic/tmids/{0}/items";
        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public HistoricalDataService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<SourceKeyResponse> ReadSourceKeysAsync(CancellationToken cancellationToken, string machineId)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
            var request = new HttpRequestMessage(HttpMethod.Get, new Uri(String.Format(GetMachineSourceKeys, machineId)));
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            if (!responseMessage.IsSuccessStatusCode)
            {
                throw new HttpException(responseMessage.StatusCode);
            }
            var content = await responseMessage.Content.ReadAsStringAsync();
            var result = SourceKeyResponseExtension.FromJson(content);
            result.MachineId = machineId;
            return result;
        }

        public async Task<HistoricalDataResponse> GetHistoricalDataAsync(CancellationToken cancellationToken, string machineId, HistoricalDataRequest historicalDataRequest)
        {

            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, new Uri(String.Format(GetHistoricalData, machineId)));
            request.Content = new StringContent(HistoricalDataReqeuestExtension.ToJson(historicalDataRequest), Encoding.UTF8, "application/json");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            Console.WriteLine(responseMessage);
            if (!responseMessage.IsSuccessStatusCode)
            {
                throw new HttpException(responseMessage.StatusCode);
            }
            var content = await responseMessage.Content.ReadAsStringAsync();
            Console.WriteLine(content);
            var result = HistoricalDataResponseExtension.FromJson(content);
            return result;
        }
    }

    public interface IHistoricalDataService
    {
        Task<HistoricalDataResponse> GetHistoricalDataAsync(CancellationToken cancellationToken, string machineId, HistoricalDataRequest request);
        Task<SourceKeyResponse> ReadSourceKeysAsync(CancellationToken cancellationToken, string machineId);
    }
}
