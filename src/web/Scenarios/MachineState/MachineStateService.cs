using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<MachineStateService> _logger;

        public MachineStateService(HttpClient httpClient, ITokenProvider tokenProvider, ILogger<MachineStateService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<JToken> ReceiveStateOfSingleMachineAsync(string machineId, CancellationToken cancellationToken)
        {
            if (machineId == null)
            {
                throw new ArgumentNullException(nameof(machineId));
            }

            if (string.IsNullOrWhiteSpace(machineId))
            {
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(machineId));
            }

            using (_logger.BeginScope(new Dictionary<string, object>{ { "MachineId", machineId }, { "RequestEndpoint", TapioMachineStateEndpoint } }))
            {
                _logger.LogInformation("Receiving states");
                var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, MachineStateRequest);
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var configuration = new MachineStateConfiguration
                {
                    MachineId = machineId
                };
                var requestContent = JsonConvert.SerializeObject(new[] { configuration }, Formatting.None);

                request.Content = new StringContent(requestContent, Encoding.UTF8, MediaTypeNames.Application.Json);

                _logger.LogInformation("Sending request to tapio");
                var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
                responseMessage.EnsureSuccessStatusCode();
                using (var stream = await responseMessage.Content.ReadAsStreamAsync())
                using (var streamReader = new StreamReader(stream))
                using (var jsonReader = new JsonTextReader(streamReader))
                {
                    _logger.LogInformation("Converting content to JSON");
                    var array = await JArray.LoadAsync(jsonReader, cancellationToken);
                    var result = array.HasValues ? array.Descendants().First() : new JObject();
                    return result;
                }
            }
        }

        private class MachineStateConfiguration
        {
            [JsonProperty("tmid")]
            public string MachineId { get; set; }
        }
    }
}
