using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataEventProcessorFactory: IMachineLiveDataEventProcessorFactory
    {
        private Func<string, Task> _func;

        public void SetCallback(Func<string, Task> func)
        {
            _func = func;
        }

        public IEventProcessor CreateEventProcessor(PartitionContext context)
        {
            return new MachineLiveDataProcessor(_func);
        }
    }

    public class MachineLiveDataProcessor : IEventProcessor
    {
        private readonly Func<string, Task> _func;
        public MachineLiveDataProcessor(Func<string, Task> func)
        {
            _func = func;
        }

        public Task OpenAsync(PartitionContext context)
        {
            return Task.CompletedTask;
        }

        public Task ProcessEventsAsync(PartitionContext context, IEnumerable<EventData> messages)
        {
            foreach (var eventData in messages)
            {
                var data = Encoding.UTF8.GetString(eventData.Body.Array, eventData.Body.Offset, eventData.Body.Count);
                _func(data);
            }

            return context.CheckpointAsync();
        }

        public Task CloseAsync(PartitionContext context, CloseReason reason)
        {
            return Task.CompletedTask;
        }

        public Task ProcessErrorAsync(PartitionContext context, Exception error)
        {
            Trace.TraceError(error.Message);
            return Task.CompletedTask;
        }
    }

    public interface IMachineLiveDataEventProcessorFactory : IEventProcessorFactory
    {
        void SetCallback(Func<string, Task> func);
    }
}
