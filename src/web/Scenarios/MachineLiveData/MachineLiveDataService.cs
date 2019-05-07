using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataService : IMachineLiveDataService
    {
        private readonly IEvenHubCredentialProvider _credentialProvider;
        private EventProcessorHost _processorHost;

        public MachineLiveDataService(IEvenHubCredentialProvider credentialProvider)
        {
            _credentialProvider = credentialProvider;
        }
        private void CreateProcessorHostConnection()
        {
            _processorHost = new EventProcessorHost(
                _credentialProvider.GetEventHubEntityPath(),
                PartitionReceiver.DefaultConsumerGroupName,
                _credentialProvider.GetEventHubConnectionString(),
                _credentialProvider.GetStorageConnectionString(),
                _credentialProvider.GetStorageContainerName()
                );
        }

        public async Task ReadHubAsync()
        {
            if (_processorHost == null)
            {
                CreateProcessorHostConnection();
            }

            var options = new EventProcessorOptions();
            options.SetExceptionHandler((e) => { Console.WriteLine(e.Exception); });
            await _processorHost.RegisterEventProcessorAsync<Processor>();
        }

        public async Task UnregisterHubAsync()
        {
            await _processorHost.UnregisterEventProcessorAsync();
        }
    }

    public interface IMachineLiveDataService
    {
        Task ReadHubAsync();

        Task UnregisterHubAsync();
    }

    public class Processor : IEventProcessor
    {
        public Task CloseAsync(PartitionContext context, CloseReason reason)
        {
            return Task.CompletedTask;
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
                Trace.TraceInformation($"Partition Id: {context.PartitionId}; Message: {data}");
            }

            return context.CheckpointAsync();
        }

        public Task ProcessErrorAsync(PartitionContext context, Exception error)
        {
            Trace.TraceError(error.Message);
            return Task.CompletedTask;
        }
    }
}
