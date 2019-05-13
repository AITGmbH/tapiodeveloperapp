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
        public async Task<ActionResult<SourceKeyResponse>> GetSourceKeys(CancellationToken cancellationToken, string machineId)
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
        [HttpPost("{machineId}")]
        public async Task<ActionResult<HistoricalDataResponse>> GetHistoricalData(CancellationToken cancellationToken, string machineId, [FromBody] HistoricalDataRequest request) 
        {
            try
            {
                var keys = await _historicalDataService.GetHistoricalDataAsync(cancellationToken, machineId, request);
                return Ok(keys);
            }
            catch (HttpException ex)
            {
                switch (ex.StatusCode)
                {
                    case HttpStatusCode.NotFound:
                        return NotFound();
                    default:
                        throw ex;
                }
            }
        }
    }
}
