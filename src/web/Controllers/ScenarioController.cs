using System;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Controllers.Scenario
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ScenarioController : Controller
    {
        private readonly IScenarioCrawler _scenarioCrawler;

        public ScenarioController(IScenarioCrawler scenarioCrawler)
        {
            _scenarioCrawler = scenarioCrawler ?? throw new ArgumentNullException(nameof(scenarioCrawler));
        }

        [HttpGet]
        public ActionResult<ScenarioEntry[]> GetAll()
        {
            var scenarioEntries = _scenarioCrawler.GetAllScenarioEntries();
            return Ok(scenarioEntries);
        }
    }
}
