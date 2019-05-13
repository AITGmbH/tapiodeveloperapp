using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        private readonly MachineLiveDataEventProcessorFactory _dataEventProcessorFactory;
        private EventProcessorHost _processorHost;
        private bool _readerEnabled;

        public MachineLiveDataService(IEvenHubCredentialProvider credentialProvider)
        {
            _credentialProvider = credentialProvider;
            _dataEventProcessorFactory = new MachineLiveDataEventProcessorFactory();

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

        public async Task ReadHubAsync(Func<string, Task> func)
        {
            if (_readerEnabled)
            {
                return;
            }

            if (_processorHost == null)
            {
                CreateProcessorHostConnection();
            }

            try
            {
                _dataEventProcessorFactory.SetCallback(func);

                var options = new EventProcessorOptions();
                options.SetExceptionHandler(e =>
                {
                    Console.WriteLine(e.Exception);
                });
                await _processorHost.RegisterEventProcessorFactoryAsync(_dataEventProcessorFactory, options);
                _readerEnabled = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }

        public async Task UnregisterHubAsync()
        {
            await _processorHost.UnregisterEventProcessorAsync();
            _readerEnabled = false;
        }
    }

    public interface IMachineLiveDataService
    {
        Task ReadHubAsync(Func<string, Task> func);

        Task UnregisterHubAsync();
    }

}
