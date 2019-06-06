using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    [Scenario("machine-live-data-scenario", "Machine Live Data", "/scenario-machinelivedata",
        "src/web/src/app/scenario-machinelivedata", "src/web/Scenarios/MachineLiveData", "https://developer.tapio.one/docs/TapioDataCategories.html#streaming-data")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineLiveDataController : Controller
    {
        private readonly bool _isLiveDataLocalMode = false;
        public MachineLiveDataController(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }
            if (hostingEnvironment == null)
            {
                throw new ArgumentNullException(nameof(hostingEnvironment));
            }

            if (bool.TryParse(configuration["UseLocalLiveData"], out bool useLocalLiveData))
            {
                _isLiveDataLocalMode = hostingEnvironment.IsDevelopment() && useLocalLiveData;
            }

        }
        [HttpGet("isLocalMode")]
        public ActionResult<bool> GetIsLiveDataLocalMode()
        {
            return Ok(_isLiveDataLocalMode);
        }
    }
}
