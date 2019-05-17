using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
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

        public MachineOverviewController(IMachineOverviewService machineOverviewService)
        {
            _machineOverviewService = machineOverviewService ?? throw new ArgumentNullException(nameof(machineOverviewService));
        }

        [HttpGet]
        public async Task<ActionResult<SubscriptionOverview>> GetAllSubscriptionsAsync(CancellationToken cancellationToken)
        {
            var subscriptions = await _machineOverviewService.GetSubscriptionsAsync(cancellationToken);
            return Ok(subscriptions);
        }
    }
}
