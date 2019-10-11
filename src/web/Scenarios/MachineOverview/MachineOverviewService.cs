using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineState;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Threading;
using System;

namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview
{
    public sealed class MachineOverviewService : IMachineOverviewService
    {
#pragma warning disable S1075 // URIs should not be hardcoded
        private const string TargetUrl = "https://globaldisco.tapio.one";
#pragma warning restore S1075 // URIs should not be hardcoded
        private const string TargetRoute = "/api/userProfile/";

        private readonly HttpClient _httpClient;
        private readonly ITokenProvider _tokenProvider;
        private readonly string _tapioEmail;

        public MachineOverviewService(HttpClient httpClient, ITokenProvider tokenProvider)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _tapioEmail = tokenProvider.GetTapioEmail() ?? throw new ArgumentNullException(nameof(tokenProvider));
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
                            machineState.HasValues ? Models.MachineState.Running : Models.MachineState.Offline;
                    }, cancellationToken)).ToList();
                await Task.WhenAll(tasks);
            }

            var token = await _tokenProvider.ReceiveTokenAsync(TapioScope.GlobalDiscovery);
            var request = new HttpRequestMessage(HttpMethod.Get, new Uri($"{TargetUrl}{TargetRoute}{WebUtility.UrlEncode(_tapioEmail)}"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var responseMessage = await _httpClient.SendAsync(request, cancellationToken).ConfigureAwait(false);
            responseMessage.EnsureSuccessStatusCode();
            var content = await responseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
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
