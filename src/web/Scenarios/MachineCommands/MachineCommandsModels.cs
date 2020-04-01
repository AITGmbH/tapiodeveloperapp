using Newtonsoft.Json;
using System.Collections.Generic;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineCommands
{
    public class Command
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("tmid")]
        public string TapioMachineId { get; set; }

        [JsonProperty("serverId")]
        public string NodeId { get; set; }

        [JsonProperty("commandType")]
        public string CommandType { get; set; }

        [JsonProperty("inArguments")]
        public Dictionary<string, InArgumentValue> InArguments { get; set; }
    }

    public class CommandItemRead : Command
    {
        public CommandItemRead()
        {
            CommandType = "itemRead";
        }
    }

    public class CommandItemWrite : Command
    {
        public CommandItemWrite()
        {
            CommandType = "itemWrite";
        }

        public void AddInArgument(string type, object value, string key = "value")
        {
            if (InArguments == null)
            {
                InArguments = new Dictionary<string, InArgumentValue>();
            }

            var argumentValue = new InArgumentValue() { ValueType = type, Value = value };
            InArguments[key] = argumentValue;
        }
    }

    public class CommandResponse
    {
        [JsonProperty("cloudConnectorId")]
        public string CloudConnectorId { get; set; }

        [JsonProperty("status")]
        public CommandResponseStatus Status { get; set; }

        [JsonProperty("commandResponse")]
        public object Response { get; set; }
    }

    public enum CommandResponseStatus
    {
        Successfull = 200,
        Failed = 400,
        DeviceBusy = 429,
        Error = 500
    }

    public class InArgumentValue
    {
        [JsonProperty("valueType")]
        public string ValueType { get; set; }

        [JsonProperty("value")]
        public object Value { get; set; }
    }
}
