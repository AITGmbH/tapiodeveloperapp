using System;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.UserData
{
    [Scenario("logout-scenario", "Logout", "/scenario-userdata/logout",
        "src/web/src/app/scenario-userdata/userdata-logout", "src/web/Scenarios/UserData", "")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public sealed class LogoutController : Controller
    {
        public LogoutController()
        {
        }
    }
}
