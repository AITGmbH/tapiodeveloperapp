using System;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.LicenseOverview
{
    [Scenario("license-overview-scenario", "License Overview", "/scenario-licenseoverview",
        "src/web/src/app/scenario-licenseoverview", "src/web/Scenarios/LicenseOverview", "https://developer.tapio.one/docs/SubscriptionOverview.html")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public sealed class LicenseOverviewController : Controller
    {
        private readonly ILicenseOverviewService _licenseOverviewService;

        public LicenseOverviewController(ILicenseOverviewService licenseOverviewService)
        {
            _licenseOverviewService = licenseOverviewService ?? throw new ArgumentNullException(nameof(licenseOverviewService));
        }

        [HttpGet]
        public async Task<ActionResult<SubscriptionOverview>> GetAllSubscriptionsAsync(CancellationToken cancellationToken)
        {
            var subscriptions = await _licenseOverviewService.GetSubscriptionsAsync(cancellationToken);
            return Ok(subscriptions);
        }
    }
}
