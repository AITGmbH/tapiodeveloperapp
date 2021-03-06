using System;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    public class SubscriptionOverview
    {
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

        [JsonProperty("role")]
        public string Role { get; set; }

        [JsonProperty("equipmentGroups")]
        public EquipmentGroup[] EquipmentGroups { get; set; }
    }

    public class EquipmentGroup
    {
        [JsonProperty("displayName")]
        public string DisplayName { get; set; }

        [JsonProperty("groupPosition")]
        public int GroupPosition { get; set; }

        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("parentId")]
        public Guid? ParentId { get; set; }
    }

    public class AssignedMachine
    {
        [JsonProperty("tmid")]
        public string Id { get; set; }

        [JsonProperty("displayName")]
        public string DisplayName { get; set; }

        [JsonProperty("equipmentGroup")]
        public EquipmentGroup EquipmentGroup { get; set; }

        [JsonProperty("machineState")]
        public MachineState MachineState { get; set; }
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

    public enum MachineState
    {
        [JsonProperty("running")]
        Running,
        [JsonProperty("offline")]
        Offline
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
