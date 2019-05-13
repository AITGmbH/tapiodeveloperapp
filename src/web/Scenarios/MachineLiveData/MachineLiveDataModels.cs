using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

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
        public string Message { get; set; }
    }
}
