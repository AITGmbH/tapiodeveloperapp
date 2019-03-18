using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricConditions
{
    public class HistoricConditionsService
    {
    }

    public interface IHistoricConditionsService
    {
        Task<SubscriptionOverview> GetSubscriptionAsync(CancellationToken cancellationToken);
    }
}
