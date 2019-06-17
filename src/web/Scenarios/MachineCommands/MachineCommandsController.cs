using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    [Scenario("machine-commands-scenario", "Machine Commands", "/scenario-machine-commands",
        "src/web/src/app/scenario-machine-commands", "src/web/Scenarios/MachineCommands", "https://developer.tapio.one/docs/Commanding.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class MachineCommandsController: Controller
    {
        [HttpPost("read")]
        public Task ExecuteCommandItemReadAsync()
        {
            
        }

        [HttpPost("write")]
        public Task ExecuteCommandItemWriteAsync()
        {
            
        }

        [HttpPost("method")]
        public Task ExecuteCommandMethodAsync()
        {
            
        }
    }
}
