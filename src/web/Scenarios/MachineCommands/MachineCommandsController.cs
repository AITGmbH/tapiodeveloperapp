using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    [Scenario("machine-commands-scenario", "Machine Commands", "/scenario-machinecommands",
        "src/web/src/app/scenario-machinecommands", "src/web/Scenarios/MachineCommands", "https://developer.tapio.one/docs/Commanding.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineCommandsController : Controller
    {
        private readonly IMachineCommandsService _commandsService;

        public MachineCommandsController(IMachineCommandsService commandsService)
        {
            _commandsService = commandsService ?? throw new ArgumentNullException(nameof(commandsService));
        }

        [HttpPost("itemRead")]
        public Task<IEnumerable<CommandResponse>> ExecuteCommandItemReadAsync([FromBody] CommandItemRead command, CancellationToken cancellationToken)
            => _commandsService.ExecuteItemReadAsync(command, cancellationToken);

        [HttpPost("itemWrite")]
        public Task<IEnumerable<CommandResponse>> ExecuteCommandItemWriteAsync([FromBody] CommandItemWrite command, CancellationToken cancellationToken)
            => _commandsService.ExecuteItemWriteAsync(command, cancellationToken);

        [HttpGet("commands")]
        public Task<IEnumerable<Command>> GetCommandsAsync(CancellationToken cancellationToken)
            => _commandsService.GetCommandsAsync(cancellationToken);
    }
}
