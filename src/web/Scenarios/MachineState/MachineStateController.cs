using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState
{
    [Scenario("machine-state-scenario", "Machine State", "/scenario-machinestate",
        "src/web/src/app/scenario-machinestate", "src/web/Scenarios/MachineSate", "https://developer.tapio.one/docs/StateApi.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineStateController : Controller
    {
        private readonly IMachineStateService _machineStateService;

        public MachineStateController(IMachineStateService machineStateService)
        {
            _machineStateService = machineStateService ?? throw new ArgumentNullException(nameof(machineStateService));
        }

        [HttpGet("{machineId:guid}")]
        public async Task<IActionResult> SingleAsync(Guid machineId, CancellationToken cancellationToken)
        {
            var result = await _machineStateService.SingleAsync(machineId, cancellationToken);
            return Ok(result);
        }
    }
}
