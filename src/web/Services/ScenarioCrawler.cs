using System;
using System.Collections.Immutable;
using System.Linq;
using Aitgmbh.Tapio.Developerapp.Web.Models;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public class ScenarioCrawler : IScenarioCrawler
    {
        public IImmutableList<ScenarioEntry> GetAllScenarioEntries()
        {
            var allScenarios =
                from a in AppDomain.CurrentDomain.GetAssemblies()
                from t in a.GetTypes()
                let attributes = t.GetCustomAttributes(typeof(ScenarioAttribute), false)
                where attributes != null && attributes.Length > 0
                let typeAttribute = (ScenarioAttribute)attributes[0]
                select new ScenarioEntry(typeAttribute.Caption, typeAttribute.Url);
            return ImmutableList.CreateRange(allScenarios);
        }
    }
}
