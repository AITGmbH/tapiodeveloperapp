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
    public class HistoricConditionsController
    {
        private readonly IHistoricConditionsService _historicConditionsService;

        public HistoricConditionsController(IHistoricConditionsService historicConditionsService)
        {
            _historicConditionsService = historicConditionsService;
        }

        //[HttpGet("{machineId}")]
        //public async Task<ActionResult<SubscriptionOverview>> GetSourceKeys(CancellationToken cancellationToken, string machineId)
        //{
        //    var keys = await _historicConditionsService.ReadSourceKeys(cancellationToken, machineId);
        //    return Ok(keys);
        //}
    }
}
