using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    public class MachineCommandsService : IMachineCommandsService
    {
        private const string TapioOneCommandingEndpoint = "https://core.tapio.one/api/commanding";

        private static readonly Uri TapioOneCommandingRequest = new Uri(TapioOneCommandingEndpoint);

        private const string CommandType = "Float";
        private const string CommandKey = "value";

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;
        private readonly ILogger<MachineCommandsService> _logger;

        public MachineCommandsService(HttpClient httpClient, ITokenProvider tokenProvider, ILogger<MachineCommandsService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<IEnumerable<CommandResponse>> ExecuteItemReadAsync(CommandItemRead command, CancellationToken cancellationToken)
        {
            var actualCommand = GetCommandById(command.Id);
            return await ExecuteCommandAsync(actualCommand, cancellationToken);
        }

        public async Task<IEnumerable<CommandResponse>> ExecuteItemWriteAsync(CommandItemWrite command, CancellationToken cancellationToken)
        {
            var actualCommand = GetCommandById(command.Id);
            actualCommand.InArguments = TranslateArgument(command.InArguments, actualCommand.InArguments);
            return await ExecuteCommandAsync(actualCommand, cancellationToken);
        }

        private async Task<IEnumerable<CommandResponse>> ExecuteCommandAsync(Command command, CancellationToken cancellationToken)
        {
            using (_logger.BeginScope(new Dictionary<string, object> { { "MachineId", command.TapioMachineId }, { "RequestEndpoint", TapioOneCommandingEndpoint } }))
            {
                var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.CoreApi);
                using (var request = new HttpRequestMessage(HttpMethod.Post, TapioOneCommandingRequest))
                {
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    var requestContent = JsonConvert.SerializeObject(command, Formatting.None);

                    request.Content = new StringContent(requestContent, Encoding.UTF8, MediaTypeNames.Application.Json);

                    _logger.LogInformation("Sending request to tapio");
                    using (var responseMessage = await _httpClient.SendAsync(request, cancellationToken))
                    {
                        responseMessage.EnsureSuccessStatusCode();
                        var content = await responseMessage.Content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<IEnumerable<CommandResponse>>(content);
                    }
                }
            }
        }

        public IEnumerable<Command> GetCommands()
            => GetDefaultCommands();

        private IEnumerable<Command> GetDefaultCommands()
        {
            var itemWriteHeatingValue = new CommandItemWrite()
            {
                Id = "Kante!Heizung01.Value-Write",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };

            itemWriteHeatingValue.AddInArgument(CommandType, 42, CommandKey);

            var itemReadHeatingValue = new CommandItemRead()
            {
                Id = "Kante!Heizung01.Value-Read",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };

            var itemWriteHeatingState = new CommandItemWrite()
            {
                Id = "Kante!Heizung01.State-Write",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };

            itemWriteHeatingState.AddInArgument(CommandType, 24, CommandKey);

            var itemReadHeatingState = new CommandItemRead()
            {
                Id = "Kante!Heizung01.State-Read",
                TapioMachineId = "2f5b690df6c0406982d49fd9b7a8835b",
                NodeId = "Simu2"
            };

            var commands = new List<Command>();
            commands.Add(itemWriteHeatingValue);
            commands.Add(itemReadHeatingValue);
            commands.Add(itemWriteHeatingState);
            commands.Add(itemReadHeatingState);

            return commands;
        }

        private Command GetCommandById(string id) => GetDefaultCommands().FirstOrDefault(el => el.Id == id);

        private Dictionary<string, InArgumentValue> TranslateArgument(Dictionary<string, InArgumentValue> commandArgument, Dictionary<string, InArgumentValue> defaultArgument)
        {
            float value = 0;
            if (commandArgument.ContainsKey(CommandKey))
            {
                var argument = commandArgument[CommandKey];
                if (float.TryParse(argument.Value.ToString(), out float result))
                {
                    value = result;
                }
            }

            var defaultCommandValue = defaultArgument[CommandKey];
            defaultCommandValue.Value = value;
            defaultArgument[CommandKey] = defaultCommandValue;
            return defaultArgument;
        }
    }

    public interface IMachineCommandsService
    {
        Task<IEnumerable<CommandResponse>> ExecuteItemReadAsync(CommandItemRead command, CancellationToken cancellationToken);

        Task<IEnumerable<CommandResponse>> ExecuteItemWriteAsync(CommandItemWrite command, CancellationToken cancellationToken);

        IEnumerable<Command> GetCommands();
    }
}
