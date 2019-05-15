using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineLiveData
{
    public class MachineLiveDataService : IMachineLiveDataService
    {
        private readonly IEvenHubCredentialProvider _credentialProvider;
        private readonly MachineLiveDataEventProcessorFactory _dataEventProcessorFactory;
        private Func<string, dynamic, Task> _func;
        private EventProcessorHost _processorHost;
        private bool _readerEnabled;

        public MachineLiveDataService(IEvenHubCredentialProvider credentialProvider)
        {
            _credentialProvider = credentialProvider;
            _dataEventProcessorFactory = new MachineLiveDataEventProcessorFactory();
        }


        public async Task ReadHubAsync()
        {
            if (_readerEnabled)
            {
                return;
            }

            if (_processorHost == null)
            {
                CreateProcessorHostConnection();
            }

            _dataEventProcessorFactory.SetCallback(HandleProcessEventsAsync);

            var options = new EventProcessorOptions();
            options.SetExceptionHandler(e =>
            {
                Trace.TraceError(e.Exception.Message);
            });
            await _processorHost.RegisterEventProcessorFactoryAsync(_dataEventProcessorFactory, options);
            _readerEnabled = true;
        }

        public void SetCallback(Func<string, dynamic, Task> func)
        {
            _func = func;
        }

        public async Task UnregisterHubAsync()
        {
            if (_readerEnabled)
            {
                await _processorHost.UnregisterEventProcessorAsync();
                _readerEnabled = false;
            }
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

        private async Task HandleProcessEventsAsync(string data)
        {
            var result = MaterialLiveDataContainerExtension.FromJson(data);
            await _func(result.MachineId, result);
        }
    }

    public interface IMachineLiveDataService
    {
        Task ReadHubAsync();

        void SetCallback(Func<string, dynamic, Task> func);

        Task UnregisterHubAsync();
    }

}
