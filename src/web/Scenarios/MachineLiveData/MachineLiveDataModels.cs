using System;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
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

    //public class Message
    //{
    //    [JsonProperty("p")]
    //    public string Provider { get; set; }

    //    [JsonProperty("sts")]
    //    public DateTime SourceTimeStamp { get; set; }

    //    [JsonProperty("rts")]
    //    public DateTime ReceiveTimeStamp { get; set; }
    //}

    //public class ItemDataMessage : Message
    //{

    //    [JsonProperty("k")]
    //    public string KeyName { get; set; }

    //    [JsonProperty("vt")]
    //    public string ValueType { get; set; }

    //    [JsonProperty("v")]
    //    public dynamic Value { get; set; }

    //    [JsonProperty("u")]
    //    public string Unit { get; set; }

    //    [JsonProperty("q")]
    //    public string Quantity { get; set; }

    //}

    //public class ConditionMessage : Message
    //{

    //    [JsonProperty("k")]
    //    public string KeyName { get; set; }

    //    [JsonProperty("s")]
    //    public string Source { get; set; }

    //    [JsonProperty("as")]
    //    public int Status { get; set; }

    //    [JsonProperty("sv")]
    //    public int Severity { get; set; }

    //    [JsonProperty("ls")]
    //    public dynamic SourceText { get; set; }

    //    [JsonProperty("lm")]
    //    public dynamic SourceMessage { get; set; }

    //    [JsonProperty("vls")]
    //    public dynamic AdditionalValueList { get; set; }
    //}

    //public class ConditionRefreshMessage: Message { }

    //public class EventDataMessage : Message
    //{
    //    [JsonProperty("k")]
    //    public string KeyName { get; set; }

    //    [JsonProperty("s")]
    //    public string Source { get; set; }

    //    [JsonProperty("vls")]
    //    public dynamic AdditionalValueList { get; set; }
    //}

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
