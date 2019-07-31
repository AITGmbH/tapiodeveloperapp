using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Logging;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataEventProcessorFactory : IMachineLiveDataEventProcessorFactory
    {
        private Func<string, Task> _callback;
        private readonly IEvenHubCredentialProvider _credentialProvider;
        private readonly ILogger<MachineLiveDataEventProcessorFactory> _logger;

        public MachineLiveDataEventProcessorFactory(IEvenHubCredentialProvider credentialProvider, ILogger<MachineLiveDataEventProcessorFactory> logger)
        {
            _credentialProvider = credentialProvider ?? throw new ArgumentNullException(nameof(credentialProvider));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public void SetCallback(Func<string, Task> func)
        {
            _callback = func;
        }

        public IEventProcessor CreateEventProcessor(PartitionContext context)
        {
            return new MachineLiveDataProcessor(_callback, _logger);
        }

        public IEventProcessorHost CreateEventProcessorHost()
        {
            return new EventProcessorHostWrapper(_credentialProvider);
        }
    }

    public class MachineLiveDataProcessor : IEventProcessor
    {
        private readonly Func<string, Task> _callback;
        private readonly ILogger _logger;

        public MachineLiveDataProcessor(Func<string, Task> callback, ILogger logger)
        {
            _callback = callback ?? throw new ArgumentNullException(nameof(callback));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task OpenAsync(PartitionContext context)
        {
            return Task.CompletedTask;
        }

        public Task ProcessEventsAsync(PartitionContext context, IEnumerable<EventData> messages)
        {
            _logger.LogInformation("Event processor received data from event hub.  PartitionId: {0} EventHubPath: {1} ConsumerGroupName: {2}", context.PartitionId, context.EventHubPath, context.ConsumerGroupName);

            foreach (var eventData in messages)
            {
                var data = Encoding.UTF8.GetString(eventData.Body.Array, eventData.Body.Offset, eventData.Body.Count);
                _callback(data);
            }

            return context.CheckpointAsync();
        }

        public Task CloseAsync(PartitionContext context, CloseReason reason)
        {
            _logger.LogInformation("Event processor closed connection.");
            return Task.CompletedTask;
        }

        public Task ProcessErrorAsync(PartitionContext context, Exception error)
        {
            _logger.LogError(error, "Error received from event hub.");
            return Task.CompletedTask;
        }
    }

    public interface IMachineLiveDataEventProcessorFactory : IEventProcessorFactory
    {
        /// <summary>
        /// Sets the callback for the azure event hub.
        /// </summary>
        /// <param name="func">Callback method to receive json</param>
        void SetCallback(Func<string, Task> func);

        /// <summary>
        /// Creates and return the instance of <see cref="IEventProcessorHost"/>.
        /// </summary>
        /// <returns><see cref="IEventProcessorHost"/></returns>
        IEventProcessorHost CreateEventProcessorHost();
    }

    /// <summary>
    /// The Event Processor Host interface for usage of <see cref="EventProcessorHost"/>
    /// </summary>
    public interface IEventProcessorHost
    {
        /// <summary>
        /// Registers the <see cref="IEventProcessorFactory"/> with its <see cref="EventProcessorOptions"/>.
        /// </summary>
        /// <param name="factory">The provided <see cref="IEventProcessorFactory"/></param>
        /// <param name="options">The provided <see cref="EventProcessorOptions"/></param>
        /// <returns>The completed task.</returns>
        Task RegisterEventProcessorFactoryAsync(IEventProcessorFactory factory, EventProcessorOptions options);

        /// <summary>
        /// Unregisters the event processor.
        /// </summary>
        /// <returns>The completed task.</returns>
        Task UnregisterEventProcessorAsync();
    }

    /// <summary>
    /// The Event Processor Host interface wrapper of <see cref="EventProcessorHost"/> for usage within actual services.
    /// </summary>
    public class EventProcessorHostWrapper : IEventProcessorHost
    {
        private readonly EventProcessorHost _wrappedProcessorHost;

        public EventProcessorHostWrapper(IEvenHubCredentialProvider credentialProvider)
        {
            _wrappedProcessorHost = new EventProcessorHost(
                credentialProvider.GetEventHubEntityPath(),
                PartitionReceiver.DefaultConsumerGroupName,
                credentialProvider.GetEventHubConnectionString(),
                credentialProvider.GetStorageConnectionString(),
                credentialProvider.GetStorageContainerName()
            );
        }

        public async Task RegisterEventProcessorFactoryAsync(IEventProcessorFactory factory, EventProcessorOptions options)
        {
            await _wrappedProcessorHost.RegisterEventProcessorFactoryAsync(factory, options).ConfigureAwait(false);
        }

        public async Task UnregisterEventProcessorAsync()
        {
            await _wrappedProcessorHost.UnregisterEventProcessorAsync().ConfigureAwait(false);
        }
    }
}
