using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{machineId}")]
        public Task<HistoricConditionsResponse> ReadConditions(CancellationToken cancellationToken, string machineId)
        {
            return ReadConditions(cancellationToken, machineId, new HistoricConditionsRequest() {From = DateTime.Now.AddDays(-3)});
        }
        
        public async Task<HistoricConditionsResponse> ReadConditions(CancellationToken cancellationToken, string machineId, HistoricConditionsRequest requestData)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, new Uri(String.Format(GetData, machineId)));
            request.Content = new StringContent(HistoricConditionsRequestExtension.ToJson(requestData),Encoding.UTF8, "application/json");
            // https://localhost:5001/api/historicconditions/2f5b690df6c0406982d49fd9b7a8835b

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request,  cancellationToken);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync();
            var result = HistoricConditionsResponseExtension.FromJson(content);
            return result;
        }
    }

    public interface IHistoricConditionsService
    {
        Task<HistoricConditionsResponse> ReadConditions(CancellationToken cancellationToken, string machineId);
        Task<HistoricConditionsResponse> ReadConditions(CancellationToken cancellationToken, string machineId, HistoricConditionsRequest requestData);
    }
}
