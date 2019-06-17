using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    [Scenario("machine-commands-scenario", "Machine Commands", "/scenario-machinecommands",
        "src/web/src/app/scenario-machinecommands", "src/web/Scenarios/MachineCommands", "https://developer.tapio.one/docs/Commanding.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineCommandsController: Controller
    {
        private readonly IMachineCommandsService _commandsService;
        public MachineCommandsController(IMachineCommandsService commandsService)
        {
            _commandsService = commandsService ?? throw new ArgumentNullException(nameof(commandsService));
        }
        [HttpPost("read")]
        public Task<CommandResponse> ExecuteCommandItemReadAsync([FromBody] CommandItemRead command, CancellationToken cancellationToken)
        {
            return _commandsService.ExecuteItemReadAsync(command, cancellationToken);
        }

        [HttpPost("write")]
        public Task ExecuteCommandItemWriteAsync([FromBody] CommandItemWrite command, CancellationToken cancellationToken)
        {
            return _commandsService.ExecuteItemWriteAsync(command, cancellationToken);

        }

        [HttpPost("method")]
        public Task ExecuteCommandMethodAsync([FromBody] CommandMethod command, CancellationToken cancellationToken)
        {
            return _commandsService.ExecuteMethodAsync(command, cancellationToken);
        }
    }
}
