using Aitgmbh.Tapio.Developerapp.Web.Configurations;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.UserData;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.UserData
{
    public class UserDataServiceTests
    {
        private readonly IOptions<TapioCloudCredentials> _testOptions = Options.Create(new TapioCloudCredentials {
            ClientId = "TestClientId",
            ClientSecret = "TestClientSecret"
        });

        [Fact]
        public void GetClientId_ReturnsTestClientId()
        {
            var userDataService = new UserDataService(_testOptions);

            var result = userDataService.GetClientId();
            result.Should().BeOfType(typeof(string));
            result.Should().BeEquivalentTo(_testOptions.Value.ClientId);
        }
    }
}
