using Newtonsoft.Json;
using System.Collections.Generic;
using System.Dynamic;

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
        public dynamic InArguments { get; set; }
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

        public void AddInArgument(string type, dynamic value, string key = "value")
        {
            if (InArguments == null)
            {
                InArguments = new ExpandoObject() as IDictionary<string, object>;
            }

            var argumentValue = new InArgumentValue() { ValueType = type, Value = value };

            var expandoDict = InArguments as IDictionary<string, object>;
            if (expandoDict.ContainsKey(key))
            {
                expandoDict[key] = argumentValue;
            }
            else
            {
                expandoDict.Add(key, argumentValue);
            }
        }
    }

    public class CommandResponse
    {
        [JsonProperty("cloudConnectorId")]
        public string CloudConnectorId { get; set; }

        [JsonProperty("status")]
        public CommandResponseStatus Status { get; set; }

        [JsonProperty("commandResponse")]
        public dynamic Response { get; set; }
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

        public InArgumentValue()
        {
        }

        public InArgumentValue(dynamic value, string valueType)
        {
            ValueType = valueType;
            Value = value;
        }

        [JsonProperty("value")]
        public dynamic Value { get; set; }
    }
}
