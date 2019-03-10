using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricalData
{
    [Scenario("historical-data-scenario", "Historical Data", "/scenario-historicaldata",
        "src/web/src/app/scenario-historicaldata", "src/web/Scenarios/HistoricalData", "https://developer.tapio.one/docs/HistoricalData.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public sealed class HistoricalDataController
    {
    }
}
