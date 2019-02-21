namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    public class ScenarioEntry
    {
        public ScenarioEntry(string caption, string url)
        {
            Caption = caption;
            Url = url;
        }

        public string Caption { get; }

        public string Url { get; }
    }
}
