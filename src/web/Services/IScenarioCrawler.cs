using System.Collections.Immutable;

using Aitgmbh.Tapio.Developerapp.Web.Models;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public interface IScenarioCrawler
    {
        IImmutableList<ScenarioEntry> GetAllScenarioEntries();
    }
}
