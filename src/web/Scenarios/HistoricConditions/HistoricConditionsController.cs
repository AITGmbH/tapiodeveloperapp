using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricConditions
{
    [Scenario("historic-conditions-scenario", "Historic Conditions", "/scenario-historicconditions",
        "src/web/src/app/scenario-historicconditions", "src/web/Scenarios/HistoricConditions", "https://developer.tapio.one/docs/HistoricalData.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class HistoricConditionsController : Controller
    {
        private readonly IHistoricConditionsService _historicConditionsService;

        public HistoricConditionsController(IHistoricConditionsService historicConditionsService)
        {
            _historicConditionsService = historicConditionsService ?? throw new ArgumentNullException(nameof(historicConditionsService));
        }

        [HttpGet("{machineId}")]
        public async Task<ActionResult<SubscriptionOverview>> GetConditions(CancellationToken cancellationToken, string machineId)
        {
            var resp = await _historicConditionsService.ReadConditionsAsync(cancellationToken, machineId);
            return Ok(resp);
        }

        [HttpPost("{machineId}")]
        public async Task<ActionResult<SubscriptionOverview>> GetConditionByDate(CancellationToken cancellationToken, string machineId, [FromBody] HistoricConditionsRequest historicConditionsRequest)
        {
            var resp = await _historicConditionsService.ReadConditionsAsync(cancellationToken, machineId, historicConditionsRequest);
            return Ok(resp);
        }
    }
}
