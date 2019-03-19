using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricConditions
{
    public class HistoricConditionsRequest
    {
        [JsonProperty("from")]
        public DateTime? From { get; set; }
        [JsonProperty("to")]
        public DateTime? To { get; set; }
    }
    public class HistoricConditionsResponse
    {
        [JsonProperty("values")]
        public ConditionData[] ConditionDataValues { get; set; }
    }

    public class ConditionData
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("provider")]
        public string Provider { get; set; }

        [JsonProperty("values")]
        public Entry[] Entries { get; set; }
    }

    public class Entry
    {
        [JsonProperty("sts")]
        public DateTime SourceTimestamp { get; set; }

        [JsonProperty("rts_utc_start")]
        public DateTime? ConditionActiveStartUtc { get; set; }

        [JsonProperty("rts_start")]
        public DateTime? ConditionActiveStart { get; set; }

        [JsonProperty("rts_utc_end")]
        public DateTime? ConditionActiveEndUtc { get; set; }

        [JsonProperty("rts_end")]
        public DateTime? ConditionActiveEnd { get; set; }
        [JsonProperty("rts_utc_end_quality")]
        public string EndTimeQuality { get; set; }
        [JsonProperty("p")]
        public string ProviderIdentifier { get; set; }
        [JsonProperty("k")]
        public string Key { get; set; }
        [JsonProperty("s")]
        public string SourceId { get; set; }
        [JsonProperty("sv")]
        public string Severity { get; set; }
        [JsonProperty("ls")]
        public dynamic LocalizedSourceStrings { get; set; }
        [JsonProperty("lm")]
        public dynamic LocalizedMessagesStrings { get; set; }
        [JsonProperty("vls")]
        public dynamic AdditionalValueList { get; set; }
    }


    public static class HistoricConditionsResponseExtension
    {
        public static HistoricConditionsResponse FromJson(string json) => JsonConvert.DeserializeObject<HistoricConditionsResponse>(json, Converter.Settings);
    }

    public static class HistoricConditionsRequestExtension
    {
        public static string ToJson(HistoricConditionsRequest req) => JsonConvert.SerializeObject(req, Converter.Settings);
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
