using System;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    /// <summary>
    /// Data model for machine data as returned by the machine live data service
    /// </summary>
    public class MachineLiveDataContainer
    {
        [JsonProperty("tmid")]
        public string MachineId { get; set; }

        [JsonProperty("msgid")]
        public string MessageId { get; set; }

        [JsonProperty("msgts")]
        public DateTime MessageTimeStamp { get; set; }

        [JsonProperty("msgt")]
        public string MessageType { get; set; }

        [JsonProperty("msg")]
        public dynamic Message { get; set; }
    }

    public static class MaterialLiveDataContainerExtension
    {
        public static MachineLiveDataContainer FromJson(string json)
        {
            return JsonConvert.DeserializeObject<MachineLiveDataContainer>(json, Converter.Settings);
        }
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
