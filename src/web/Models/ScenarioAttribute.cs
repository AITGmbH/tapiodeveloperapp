using System;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    [AttributeUsage(validOn: AttributeTargets.Class, AllowMultiple = false)]
    public sealed class ScenarioAttribute : Attribute
    {
        public ScenarioAttribute(string caption, string url)
        {
            Caption = caption;
            Url = url;
        }

        public string Caption { get; }

        public string Url { get; }
    }
}
