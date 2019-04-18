using System;
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

    public class HistoricalDataResponse {
        [JsonProperty("values")]
        public HistoricalDataResponseElement[] Values { get; set; }
    }
    public class HistoricalDataResponseElement {
        
        [JsonProperty("key")]
        public string Key { get; set; }
        // TODO: clarify why and if doc is wrong - it specifies "value"
        [JsonProperty("values")]
        public HistoricalItemData[] Values { get; set; }
        [JsonProperty("moreDataAvailable")]
        public bool MoreDataAvailable { get; set; }
    }

    public class HistoricalItemData
    {
        [JsonProperty("rts_utc")]
        public DateTime? ReceiveTimestampUtc { get; set; }
        [JsonProperty("k")]
        public string Key { get; set; }
        [JsonProperty("vt")]
        public string DataValueType { get; set; }
        [JsonProperty("v")]
        public dynamic Value { get; set; }

        [JsonProperty("vNum")]
        public double? ValueAsNumber { get; set; }
        [JsonProperty("u")]
        public string Unit { get; set; }
        [JsonProperty("q")]
        public string Quality { get; set; }
        [JsonProperty("sts")]
        public DateTime SourceTimestamp { get; set; }

        [JsonProperty("rts")]
        public string ReceiveTimestamp { get; set; }
    }

    public class HistoricalDataRequest {
        
        [JsonProperty("from")]
        public string From { get; set; }
        [JsonProperty("to")]
        public string To { get; set; }
        [JsonProperty("keys")]
        public string[] Keys { get; set; }
        [JsonProperty("limit")]
        public int? Limit { get; set; }
    }

    public static class SourceKeyResponseExtension
    {
        public static SourceKeyResponse FromJson(string json) => JsonConvert.DeserializeObject<SourceKeyResponse>(json, Converter.Settings);
    }
    public static class HistoricalDataResponseExtension
    {
        public static HistoricalDataResponse FromJson(string json) => JsonConvert.DeserializeObject<HistoricalDataResponse>(json, Converter.Settings);
    }

    public static class HistoricalDataReqeuestExtension
    {
        public static string ToJson(HistoricalDataRequest req) => JsonConvert.SerializeObject(req, Converter.Settings);
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
