using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    [Scenario("machine-live-data-scenario", "Machine Live Data", "/scenario-machine-live-data",
        "src/web/src/app/scenario-machine-live-data", "src/web/Scenarios/MachineLiveData", "https://developer.tapio.one/docs/HistoricalData.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineLiveDataController: Controller
    {
        [HttpGet("{machindeId}")]
        public OkResult GetMachineDataStream(CancellationToken cancellationToken, string machineId)
        {
            return Ok();
        }
    }
}
