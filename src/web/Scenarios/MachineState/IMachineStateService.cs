using System;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState
{
    public interface IMachineStateService
    {
        Task<JArray> SingleAsync(string machineId, CancellationToken cancellationToken);
    }
}
