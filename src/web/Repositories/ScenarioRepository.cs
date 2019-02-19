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
            _scenarioCrawler = scenarioCrawler;
        }

        public IImmutableList<ScenarioAttribute> GetAll() => _scenarioCrawler.GetAllScenarioEntries();

        public ScenarioAttribute GetById(string id) => _scenarioCrawler.GetAllScenarioEntries().Single(s => s.Id.Equals(id, StringComparison.Ordinal));
    }

    public interface IScenarioRepository
    {
        IImmutableList<ScenarioAttribute> GetAll();

        ScenarioAttribute GetById(string id);
    }
}
