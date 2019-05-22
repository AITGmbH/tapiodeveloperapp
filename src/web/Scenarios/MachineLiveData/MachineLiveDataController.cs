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
        private readonly IHubContext<MachineLiveDataHub> _hub;
        private readonly IMachineLiveDataService _machineLiveDataService;
        public MachineLiveDataController(IHubContext<MachineLiveDataHub> hub, IMachineLiveDataService machineLiveDataService)
        {
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
            _machineLiveDataService = machineLiveDataService ?? throw new ArgumentNullException(nameof(machineLiveDataService));
            _machineLiveDataService.SetCallback(SendAsync);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            try
            {
                if (!_machineLiveDataService.IsReaderEnabled())
                {
                    await _machineLiveDataService.RegisterHubAsync();
                }
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }

        private async Task SendAsync(string machineId, MachineLiveDataContainer data)
        {
            await _hub.Clients.Group(machineId).SendAsync("streamMachineData", data);
        }
    }
}
