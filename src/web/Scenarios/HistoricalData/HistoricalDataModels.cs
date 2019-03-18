using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricalData
{
    public class SourceKeyResponse
    {
        [JsonProperty("tmid")]
        public string MachineId { get; set; }

        [JsonProperty("keys")]
        public string[] Keys { get; set; }
    }

    public static class SourceKeyResponseExtension
    {
        public static SourceKeyResponse FromJson(string json) => JsonConvert.DeserializeObject<SourceKeyResponse>(json, Converter.Settings);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
