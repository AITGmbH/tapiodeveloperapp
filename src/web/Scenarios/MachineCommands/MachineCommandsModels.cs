using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

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

    //public class CommandMethod : Command
    //{
    //    public CommandMethod()
    //    {
    //        CommandType = "method";
    //    }
    //}

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

    //public class CommandValueType
    //{
    //    private CommandValueType(string value) { Value = value; }

    //    public string Value { get; set; }

    //    public static CommandValueType Int32 { get { return new CommandValueType("Int32"); } }
    //    public static CommandValueType UInt32 { get { return new CommandValueType("UInt32"); } }
    //    public static CommandValueType Boolean { get { return new CommandValueType("Boolean"); } }
    //    public static CommandValueType String { get { return new CommandValueType("String"); } }
    //    public static CommandValueType Byte { get { return new CommandValueType("byte[]"); } }
    //    public static CommandValueType Double { get { return new CommandValueType("Double"); } }
    //    public static CommandValueType Float { get { return new CommandValueType("Float"); } }

    //}

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

        //[JsonIgnore]
        //public CommandValueType ValueType { get; set; }

        //[JsonProperty("valueType")]
        //public string Type {
        //    get { return ValueType.Value; }

        //    set { ValueType.Value = value; }
        //}

        [JsonProperty("value")]
        public dynamic Value { get; set; }
    }
}
