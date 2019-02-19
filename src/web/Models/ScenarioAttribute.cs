using System;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    [AttributeUsage(validOn: AttributeTargets.Class, AllowMultiple = false)]
    public sealed class ScenarioAttribute : Attribute
    {
        public ScenarioAttribute(string id, string caption, string url, string frontendSourcePath, string backendSourcePath)
        {
            Id = id;
            Caption = caption;
            Url = url;
            FrontendSourcePath = frontendSourcePath;
            BackendSourcePath = backendSourcePath;
        }

        public string Id { get; }

        public string Caption { get; }

        public string Url { get; }

        public string FrontendSourcePath { get; }

        public string BackendSourcePath { get; }
    }
}
