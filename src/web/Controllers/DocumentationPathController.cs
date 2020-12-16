using System;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DocumentationPathController : Controller
    {
        private readonly IScenarioRepository _scenarioRepository;

        public DocumentationPathController(IScenarioRepository scenarioRepository)
        {
            _scenarioRepository = scenarioRepository ?? throw new ArgumentNullException(nameof(scenarioRepository));
        }

        [HttpGet("{id}")]
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

            return Ok(new DocumentationPaths(scenario.FrontendSourcePath, scenario.BackendSourcePath, scenario.TapioDocumentationUrl));
        }
    }

    public class DocumentationPaths
    {
        public DocumentationPaths(string frontend, string backend, string tapio)
        {
            Frontend = frontend;
            Backend = backend;
            Tapio = tapio;
        }

        public string Frontend { get; }

        public string Backend { get; }

        public string Tapio { get; }
    }
}
