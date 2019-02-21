using System;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview
{
    public class SubscriptionOverview
    {
        [JsonProperty("totalCount")]
        public long TotalCount { get; set; }

        [JsonProperty("subscriptions")]
        public Subscription[] Subscriptions { get; set; }
    }

    public class Subscription
    {
        [JsonProperty("licenses")]
        public License[] Licenses { get; set; }

        [JsonProperty("subscriptionId")]
        public Guid SubscriptionId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("tapioId")]
        public string TapioId { get; set; }

        [JsonProperty("assignedMachines")]
        public AssignedMachine[] AssignedMachines { get; set; }

        [JsonProperty("subscriptionTypes")]
        public string[] SubscriptionTypes { get; set; }
    }

    public class AssignedMachine
    {
        [JsonProperty("tmid")]
        public string Id { get; set; }

        [JsonProperty("displayName")]
        public string DisplayName { get; set; }
    }

    public class License
    {
        [JsonProperty("licenseId")]
        public Guid LicenseId { get; set; }

        [JsonProperty("applicationId")]
        public Guid ApplicationId { get; set; }

        [JsonProperty("createdDate")]
        public DateTimeOffset CreatedDate { get; set; }

        [JsonProperty("billingStartDate")]
        public DateTimeOffset BillingStartDate { get; set; }

        [JsonProperty("billingInterval")]
        public string BillingInterval { get; set; }

        [JsonProperty("licenseCount")]
        public long LicenseCount { get; set; }
    }

    public static class SubscriptionOverviewExtension
    {
        public static SubscriptionOverview FromJson(string json) => JsonConvert.DeserializeObject<SubscriptionOverview>(json, Converter.Settings);
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
