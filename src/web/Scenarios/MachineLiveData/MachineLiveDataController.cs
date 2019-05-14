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
    public class MachineLiveDataController: Controller
    {
        private readonly IHubContext<MachineLiveDataHub> _hub;
        private readonly IMachineLiveDataService _machineLiveDataService;
        public MachineLiveDataController(IHubContext<MachineLiveDataHub> hub, IMachineLiveDataService machineLiveDataService)
        {
            _hub = hub;
            _machineLiveDataService = machineLiveDataService;
            _machineLiveDataService.SetCallback(SendAsync);
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            await _machineLiveDataService.ReadHubAsync();
            return Ok();
        }

        private async Task SendAsync(object data)
        {
            await _hub.Clients.All.SendAsync("streamMachineData", data);
        }
    }
}
