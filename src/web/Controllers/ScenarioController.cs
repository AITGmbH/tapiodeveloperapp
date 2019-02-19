using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Controllers.Scenario
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ScenarioController : Controller
    {
        [HttpGet]
        public ActionResult<ScenarioEntry[]> GetAll()
        {
            return Ok(new ScenarioEntry[] { new ScenarioEntry("Test1", "/yeah"), new ScenarioEntry("Test2", "/yeah2") });
        }
    }

    public class ScenarioEntry
    {
        public ScenarioEntry(string caption, string url)
        {
            Caption = caption;
            Url = url;
        }

        public string Caption { get; }

        public string Url { get; }
    }
}
