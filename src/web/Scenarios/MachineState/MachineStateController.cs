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

        [HttpGet("{machineId}")]
        public async Task<IActionResult> GetMachineStateAsync(string machineId, CancellationToken cancellationToken)
        {
            var result = await _machineStateService.GetMachineStateAsync(machineId, cancellationToken);
            return Ok(result);
        }
    }
}
