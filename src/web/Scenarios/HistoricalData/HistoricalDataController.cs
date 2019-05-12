using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricalData
{
    [Scenario("historical-data-scenario", "Historical Data", "/scenario-historicaldata",
        "src/web/src/app/scenario-historicaldata", "src/web/Scenarios/HistoricalData", "https://developer.tapio.one/docs/HistoricalData.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public sealed class HistoricalDataController : Controller
    {
        private readonly IHistoricalDataService _historicalDataService;

        public HistoricalDataController(IHistoricalDataService historicalDataService)
        {
            _historicalDataService = historicalDataService;
        }

        [HttpGet("{machineId}")]
        public async Task<ActionResult<SubscriptionOverview>> GetSourceKeys(CancellationToken cancellationToken, string machineId)
        {
            try
            {
                var keys = await _historicalDataService.ReadSourceKeysAsync(cancellationToken, machineId);

                return Ok(keys);
            }
            catch (HttpException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
            {
                return NotFound();
            }
        }
    }
}
