using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview
{
    [Scenario("machine-overview-scenario", "Machine Overview", "/scenario-machineoverview",
        "src/web/src/app/scenario-machineoverview", "src/web/Scenarios/MachineOverview", "https://developer.tapio.one/docs/SubscriptionOverview.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public sealed class MachineOverviewController : Controller
    {
        private readonly IMachineOverviewService _machineOverviewService;
        private readonly IMachineStateService _machineStateService;

        public MachineOverviewController(IMachineOverviewService machineOverviewService, IMachineStateService machineStateService)
        {
            _machineOverviewService = machineOverviewService ?? throw new ArgumentNullException(nameof(machineOverviewService));
            _machineStateService = machineStateService ?? throw new ArgumentNullException(nameof(machineStateService));
        }

        [HttpGet]
        public async Task<ActionResult<SubscriptionOverview>> GetAllSubscriptionsAsync(CancellationToken cancellationToken)
        {
            var subscriptions = await _machineOverviewService.GetSubscriptionsAsync(cancellationToken);
            foreach (var subscription in subscriptions.Subscriptions)
            {
                foreach (var assignedMachine in subscription.AssignedMachines)
                {
                    var machineState = await _machineStateService.GetMachineStateAsync(assignedMachine.Id, cancellationToken);
                    assignedMachine.MachineState = machineState.HasValues ? MachineState.Running : MachineState.Offline;
                }
            }
            return Ok(subscriptions);
        }
    }
}
