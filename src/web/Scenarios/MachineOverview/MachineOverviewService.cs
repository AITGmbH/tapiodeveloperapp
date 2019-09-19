using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState;
using Aitgmbh.Tapio.Developerapp.Web.Services;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview
{
    public sealed class MachineOverviewService : IMachineOverviewService
    {
        private const string GlobalDiscoSubscriptionOverview = "https://globaldisco.tapio.one/api/subscriptionOverview";

        private static readonly Uri GlobalDiscoSubscriptionOverviewRequest = new Uri(GlobalDiscoSubscriptionOverview);

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;

        public MachineOverviewService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<SubscriptionOverview> GetSubscriptionsAsync(CancellationToken cancellationToken, IMachineStateService machineStateService)
        {
            async Task GetMachineState(SubscriptionOverview subscriptionOverview)
            {
                var tasks = (
                    from subscription in subscriptionOverview.Subscriptions
                    from assignedMachine in subscription.AssignedMachines
                    select Task.Run(async () =>
                    {
                        var machineState =
                            await machineStateService.GetMachineStateAsync(assignedMachine.Id, cancellationToken);
                        assignedMachine.MachineState =
                            machineState.HasValues ? MachineState.Running : MachineState.Offline;
                    }, cancellationToken)).ToList();
                await Task.WhenAll(tasks);
            }

            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.GlobalDiscovery);
            var request = new HttpRequestMessage(HttpMethod.Get, GlobalDiscoSubscriptionOverviewRequest);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync();
            var result = SubscriptionOverviewExtension.FromJson(content);
            await GetMachineState(result);
            return result;
        }
    }

    public interface IMachineOverviewService
    {
        Task<SubscriptionOverview> GetSubscriptionsAsync(CancellationToken cancellationToken, IMachineStateService machineStateService);
    }
}
