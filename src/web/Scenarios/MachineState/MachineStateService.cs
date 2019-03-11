using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState
{
    public class MachineStateService : IMachineStateService
    {
        private const string TapioMachineStateEndpoint = "https://core.tapio.one/api/machines/state";

        private static readonly Uri MachineStateRequest = new Uri(TapioMachineStateEndpoint);

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public MachineStateService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<JArray> SingleAsync(string machineId, CancellationToken cancellationToken)
        {
            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, MachineStateRequest);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var configuration = new MachineStateConfiguration
            {
                MachineId = machineId
            };
            var requestContent = JsonConvert.SerializeObject(new[] {configuration}, Formatting.None);

            request.Content = new StringContent(requestContent, Encoding.UTF8, MediaTypeNames.Application.Json);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            responseMessage.EnsureSuccessStatusCode();
            using (var stream = await responseMessage.Content.ReadAsStreamAsync())
            using (var streamReader = new StreamReader(stream))
            using (var jsonReader = new JsonTextReader(streamReader))
            {
                var array = await JArray.LoadAsync(jsonReader, cancellationToken);
                return array;
            }
        }

        private class MachineStateConfiguration
        {
            [JsonProperty("tmid")]
            public string MachineId { get; set; }
        }
    }
}
