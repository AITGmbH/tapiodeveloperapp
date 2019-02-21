using System;
using System.Diagnostics.CodeAnalysis;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
#pragma warning disable S1309 // Track uses of in-source issue suppressions
    [SuppressMessage("Major Code Smell", "S3996:URI properties should not be strings", Justification = "It is just an dto")]
    [SuppressMessage("Major Code Smell", "S3994:URI Parameters should not be strings", Justification = "It is just an dto")]
#pragma warning restore S1309 // Track uses of in-source issue suppressions
    [AttributeUsage(AttributeTargets.Class)]
    public sealed class ScenarioAttribute : Attribute
    {
        public ScenarioAttribute(string id, string caption, string url, string frontendSourcePath, string backendSourcePath, string tapioDocumentationUrl)
        {
            Id = id;
            Caption = caption;
            Url = url;
            FrontendSourcePath = frontendSourcePath;
            BackendSourcePath = backendSourcePath;
            TapioDocumentationUrl = tapioDocumentationUrl;
        }

        public string Id { get; }

        public string Caption { get; }

        public string Url { get; }

        public string FrontendSourcePath { get; }

        public string BackendSourcePath { get; }

        public string TapioDocumentationUrl { get; }
    }
}
