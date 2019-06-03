using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    [Scenario("machine-live-data-scenario", "Machine Live Data", "/scenario-machinelivedata",
        "src/web/src/app/scenario-machinelivedata", "src/web/Scenarios/MachineLiveData", "https://developer.tapio.one/docs/TapioDataCategories.html#streaming-data")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineLiveDataController : Controller
    {
    }
}
