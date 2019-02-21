using System;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    public class ScenarioEntry
    {
        public ScenarioEntry(string caption, Uri url)
        {
            if (String.IsNullOrWhiteSpace(caption))
            {
                throw new ArgumentException("message", nameof(caption));
            }

            Caption = caption;
            Url = url ?? throw new ArgumentNullException(nameof(url));
        }

        public string Caption { get; }

        public Uri Url { get; }
    }
}
