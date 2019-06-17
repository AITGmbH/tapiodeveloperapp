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

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    public class MachineCommandsService: IMachineCommandsService
    {
        private const string TapioOneCommanding = "https://core.tapio.one/api/commanding";

        private static readonly Uri TapioOneCommandingRequest = new Uri(TapioOneCommanding);

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;
        private readonly ILogger<MachineCommandsService> _logger;
        public MachineCommandsService(HttpClient httpClient, ITokenProvider tokenProvider, ILogger<MachineCommandsService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task ExecuteItemReadAsync(CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(machineId))
            {
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(machineId));
            }

            using (_logger.BeginScope(new Dictionary<string, object> { { "MachineId", machineId }, { "RequestEndpoint", TapioMachineStateEndpoint } }))
            {
                _logger.LogInformation("Receiving states");
                var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
                var request = new HttpRequestMessage(HttpMethod.Post, TapioOneCommandingRequest);
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
                    var result = array.
                    return result;
                }
            }
        }

        public Task ExecuteItemWriteAsync()
        {
            throw new NotImplementedException();
        }

        public Task ExecuteMethodAsync()
        {
            throw new NotImplementedException();
        }

    }

    public interface IMachineCommandsService
    {
        Task ExecuteItemReadAsync(CancellationToken cancellationToken);
        Task ExecuteItemWriteAsync();
        Task ExecuteMethodAsync();
    }
}
