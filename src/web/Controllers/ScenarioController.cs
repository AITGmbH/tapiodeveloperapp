using System;
using System.Linq;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Controllers.Scenario
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ScenarioController : Controller
    {
        private readonly IScenarioRepository _scenarioRepository;

        public ScenarioController(IScenarioRepository scenarioRepository)
        {
            _scenarioRepository = scenarioRepository ?? throw new ArgumentNullException(nameof(scenarioRepository));
        }

        [HttpGet]
        public ActionResult<ScenarioEntry[]> GetAll()
        {
            var scenarioEntries = _scenarioRepository
                .GetAll()
                .Select(a => new ScenarioEntry(a.Caption, a.Url));
            return Ok(scenarioEntries);
        }
    }
}
