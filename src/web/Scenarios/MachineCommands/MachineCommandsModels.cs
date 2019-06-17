using System;
using System.Collections.Generic;
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
        public dynamic Value { get; set; }
    }

    public class CommandMethod : Command
    {
        public CommandMethod()
        {
            CommandType = "method";
        }
    }

    public class CommandResponse
    {
        public string CloudConnectorId { get; set; }
        public CommandResponseStatus Status { get; set; }
        public string StatusDescription { get; set; }
        public dynamic Response { get; set; }
    }

    public enum CommandResponseStatus
    {
        Successfull = 200,
        Failed = 400,
        DeviceBusy = 429,
        Error = 500
    }
}
