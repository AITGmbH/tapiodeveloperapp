using System;
using System.Linq;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Controllers
{
    public class DocumentationPathController : Controller
    {
        private readonly IScenarioRepository _scenarioRepository;

        public DocumentationPathController(IScenarioRepository scenarioRepository)
        {
            _scenarioRepository = scenarioRepository ?? throw new ArgumentNullException(nameof(scenarioRepository));
        }

        [HttpGet]
        public ActionResult<DocumentationPaths> Get(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("null or whitespace", nameof(id));
            }

            var scenario = _scenarioRepository.GetById(id);
            if (scenario == null)
            {
                return NotFound();
            }

            return Ok(new DocumentationPaths(scenario.FrontendSourcePath, scenario.BackendSourcePath));
        }
    }

    public class DocumentationPaths
    {
        public DocumentationPaths(string frontend, string backend)
        {
            Frontend = frontend;
            Backend = backend;
        }

        public string Frontend { get; }

        public string Backend { get; }
    }
}
