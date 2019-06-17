using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    public class MachineCommandsService: IMachineCommandsService
    {
        private const string TapioOneCommandingEndpoint = "https://core.tapio.one/api/commanding";

        private static readonly Uri TapioOneCommandingRequest = new Uri(TapioOneCommandingEndpoint);

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;
        private readonly ILogger<MachineCommandsService> _logger;
        public MachineCommandsService(HttpClient httpClient, ITokenProvider tokenProvider, ILogger<MachineCommandsService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task<CommandResponse> ExecuteItemReadAsync(CommandItemRead command, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(command.Id))
            {
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(command.Id));
            }

            if (string.IsNullOrWhiteSpace(command.NodeId))
            {
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(command.NodeId));
            }

            if (string.IsNullOrWhiteSpace(command.TapioMachineId))
            {
                throw new ArgumentException("Value cannot be null or whitespace.", nameof(command.TapioMachineId));
            }

            using (_logger.BeginScope(new Dictionary<string, object> { { "MachineId", command.TapioMachineId }, { "RequestEndpoint", TapioOneCommandingEndpoint } }))
            {
                var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
                var request = new HttpRequestMessage(HttpMethod.Post, TapioOneCommandingRequest);
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

               
                var requestContent = JsonConvert.SerializeObject(command, Formatting.None);

                request.Content = new StringContent(requestContent, Encoding.UTF8, MediaTypeNames.Application.Json);

                _logger.LogInformation("Sending request to tapio");
                var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
                responseMessage.EnsureSuccessStatusCode();
                var content = await responseMessage.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<CommandResponse>(content);
            }
        }

        public Task<CommandResponse> ExecuteItemWriteAsync(CommandItemWrite command, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<CommandResponse> ExecuteMethodAsync(CommandMethod command, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }

    public interface IMachineCommandsService
    {
        Task<CommandResponse> ExecuteItemReadAsync(CommandItemRead command, CancellationToken cancellationToken);
        Task<CommandResponse> ExecuteItemWriteAsync(CommandItemWrite command, CancellationToken cancellationToken);
        Task<CommandResponse> ExecuteMethodAsync(CommandMethod command, CancellationToken cancellationToken);
    }
}
