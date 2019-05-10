using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    [Scenario("machine-live-data-scenario", "Machine Live Data", "/scenario-machinelivedata",
        "src/web/src/app/scenario-machinelivedata", "src/web/Scenarios/MachineLiveData", "https://developer.tapio.one/docs/HistoricalData.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineLiveDataController: Controller
    {
        private readonly IHubContext<MachineLiveDataHub> _hub;
        private readonly IMachineLiveDataService _machineLiveDataService;
        public MachineLiveDataController(IHubContext<MachineLiveDataHub> hub, IMachineLiveDataService machineLiveDataService)
        {
            _hub = hub;
            _machineLiveDataService = machineLiveDataService;
        }

        [HttpGet("{machineId}")]
        public OkResult Get(string machineId)
        {
            _hub.Clients.All.SendAsync("transferdata", "Test");
            return Ok();
        }
    }
}
