using System;
using System.Linq;

using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Controllers
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
        public ActionResult<ScenarioEntry[]> Index()
        {
            var scenarioEntries = _scenarioRepository
                .GetAll()
                .Select(a => new ScenarioEntry(a.Caption, new Uri(a.Url, UriKind.Relative)));
            return Ok(scenarioEntries);
        }
    }
}
