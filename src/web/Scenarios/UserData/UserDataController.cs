using System;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.UserData
{
    [Scenario("user-data-scenario", "User Data", "/scenario-userdata",
        "src/web/src/app/scenario-userdata", "src/web/Scenarios/UserData", "https://developer.tapio.one/docs/AccessUserMachines.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public sealed class UserDataController : Controller
    {
        private readonly IUserDataService _userDataService;

        public UserDataController(IUserDataService userDataService)
        {
            _userDataService = userDataService ?? throw new ArgumentNullException(nameof(userDataService));
        }
     
        [HttpGet("clientId")]
        public ActionResult<string> GetClientId()
        {
            return Ok(_userDataService.GetClientId());
        }   
    }
}
