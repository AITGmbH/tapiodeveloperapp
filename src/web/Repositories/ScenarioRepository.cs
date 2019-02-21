using System;
using System.Collections.Immutable;
using System.Linq;

using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Repositories
{
    public class ScenarioRepository : IScenarioRepository
    {
        private readonly IScenarioCrawler _scenarioCrawler;

        public ScenarioRepository(IScenarioCrawler scenarioCrawler)
        {
            _scenarioCrawler = scenarioCrawler ?? throw new ArgumentNullException(nameof(scenarioCrawler));
        }

        public IImmutableList<ScenarioAttribute> GetAll() => _scenarioCrawler.AllScenarioEntries();

        public ScenarioAttribute GetById(string id) => _scenarioCrawler.AllScenarioEntries().Single(s => s.Id.Equals(id, StringComparison.Ordinal));
    }

    public interface IScenarioRepository
    {
#pragma warning disable S4049 // Properties should be preferred
        IImmutableList<ScenarioAttribute> GetAll();
#pragma warning restore S4049 // Properties should be preferred

        ScenarioAttribute GetById(string id);
    }
}
