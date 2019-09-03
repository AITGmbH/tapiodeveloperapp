using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Aitgmbh.Tapio.Developerapp.Web.Models;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.LicenseOverview;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.HelperClasses;
using FluentAssertions;
using Moq;
using Xunit;

namespace Aitgmbh.Tapio.Developerapp.Web.Tests.Unit.Scenarios.LicenseOverview
{
    public class LicenseOverviewServiceTests
    {
        private const string TestSubscriptions = @"{
            ""email"": ""woodgod@example.localhost"",
            ""subscriptions"": [
            {
                ""licenses"": [
                {
                    ""licenseId"": ""aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"",
                    ""applicationId"": ""aaaabbbb-bbbb-cccc-dddd-eeeeeeeeeeee"",
                    ""createdDate"": ""2018-06-29T12:25:02.8346154+00:00"",
                    ""billingStartDate"": ""2018-11-29T12:25:02.8346154+00:00"",
                    ""billingInterval"": ""P1M"",
                    ""licenseCount"": 999
                },
                {
                    ""licenseId"": ""ffffffff-1111-2222-3333-444444444444"",
                    ""applicationId"": ""ffffffff-1111-2222-3333-444444444444"",
                    ""createdDate"": ""2018-06-29T12:25:02.8346154+00:00"",
                    ""billingStartDate"": ""2018-11-29T12:25:02.8346154+00:00"",
                    ""billingInterval"": ""P1M"",
                    ""licenseCount"": 999
                }
                ],
                ""subscriptionId"": ""00000000-0000-0000-0000-000000000006"",
                ""name"": ""BVT core Subscription"",
                ""tapioId"": ""BVT core Subscription"",
                ""assignedMachines"": [
                {
                    ""tmid"": ""BVT1000004"",
                    ""displayName"": ""BVTMachine44""
                },
                {
                    ""tmid"": ""BVT1000002"",
                    ""displayName"": ""BVTMachine22""
                },
                {
                    ""tmid"": ""BVT1000003"",
                    ""displayName"": ""BVTMachine33""
                }
                ],
                ""subscriptionTypes"": [
                ""Customer""
                    ]
            },
{
                ""licenses"": [
                {
                    ""licenseId"": ""11111111-2222-3333-4444-555555555555"",
                    ""applicationId"": ""11111111-2222-3333-4444-555555555555"",
                    ""createdDate"": ""2018-06-29T12:25:02.8346154+00:00"",
                    ""billingStartDate"": ""2018-11-29T12:25:02.8346154+00:00"",
                    ""billingInterval"": ""P1M"",
                    ""licenseCount"": 999
                },
                {
                    ""licenseId"": ""55555555-6666-7777-8888-999999999999"",
                    ""applicationId"": ""55555555-6666-7777-8888-999999999999"",
                    ""createdDate"": ""2018-06-29T12:25:02.8346154+00:00"",
                    ""billingStartDate"": ""2018-11-29T12:25:02.8346154+00:00"",
                    ""billingInterval"": ""P1M"",
                    ""licenseCount"": 999
                }
                ],
                ""subscriptionId"": ""aaaaaaaa-cccc-bbbb-cccc-111111111111"",
                ""name"": ""BVT core Subscription"",
                ""tapioId"": ""BVT core Subscription"",
                ""assignedMachines"": [
                {
                    ""tmid"": ""BVT1000004"",
                    ""displayName"": ""BVTMachine44""
                },
                {
                    ""tmid"": ""BVT1000002"",
                    ""displayName"": ""BVTMachine22""
                },
                {
                    ""tmid"": ""BVT1000003"",
                    ""displayName"": ""BVTMachine33""
                }
                ],
                ""subscriptionTypes"": [
                ""Customer""
                    ]
            }]}";

        private readonly SubscriptionOverview _expectedSubscriptions = new SubscriptionOverview {
            Email = "woodgod@example.localhost",
            Subscriptions = new[] {
                new Subscription {
                    Licenses = new[] {
                        new License {
                            LicenseId = Guid.Parse("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"),
                            ApplicationId = Guid.Parse("aaaabbbb-bbbb-cccc-dddd-eeeeeeeeeeee"),
                            CreatedDate = DateTimeOffset.Parse("2018-06-29T12:25:02.8346154+00:00"),
                            BillingStartDate = DateTimeOffset.Parse("2018-11-29T12:25:02.8346154+00:00"),
                            BillingInterval = "P1M",
                            LicenseCount = 999
                        },
                        new License {
                            LicenseId = Guid.Parse("ffffffff-1111-2222-3333-444444444444"),
                            ApplicationId = Guid.Parse("ffffffff-1111-2222-3333-444444444444"),
                            CreatedDate = DateTimeOffset.Parse("2018-06-29T12:25:02.8346154+00:00"),
                            BillingStartDate = DateTimeOffset.Parse("2018-11-29T12:25:02.8346154+00:00"),
                            BillingInterval = "P1M",
                            LicenseCount = 999
                        }
                    },
                    SubscriptionId = Guid.Parse("00000000-0000-0000-0000-000000000006"),
                    Name = "BVT core Subscription",
                    TapioId = "BVT core Subscription",
                    AssignedMachines = new[] {
                        new AssignedMachine {
                            Id = "BVT1000004",
                            DisplayName = "BVTMachine44"
                        },
                        new AssignedMachine {
                            Id = "BVT1000002",
                            DisplayName = "BVTMachine22"
                        },
                        new AssignedMachine {
                            Id = "BVT1000003",
                            DisplayName = "BVTMachine33"
                        }
                    },
                    SubscriptionTypes = new[] {
                        "Customer"
                    }
                },
                new Subscription() {
                    Licenses = new[] {
                        new License {
                            LicenseId = Guid.Parse("11111111-2222-3333-4444-555555555555"),
                            ApplicationId = Guid.Parse("11111111-2222-3333-4444-555555555555"),
                            CreatedDate = DateTimeOffset.Parse("2018-06-29T12:25:02.8346154+00:00"),
                            BillingStartDate = DateTimeOffset.Parse("2018-11-29T12:25:02.8346154+00:00"),
                            BillingInterval = "P1M",
                            LicenseCount = 999
                        },
                        new License {
                            LicenseId = Guid.Parse("55555555-6666-7777-8888-999999999999"),
                            ApplicationId = Guid.Parse("55555555-6666-7777-8888-999999999999"),
                            CreatedDate = DateTimeOffset.Parse("2018-06-29T12:25:02.8346154+00:00"),
                            BillingStartDate = DateTimeOffset.Parse("2018-11-29T12:25:02.8346154+00:00"),
                            BillingInterval = "P1M",
                            LicenseCount = 999
                        }
                    },
                    SubscriptionId = Guid.Parse("aaaaaaaa-cccc-bbbb-cccc-111111111111"),
                    Name = "BVT core Subscription",
                    TapioId = "BVT core Subscription",
                    AssignedMachines = new[] {
                        new AssignedMachine {
                            Id = "BVT1000004",
                            DisplayName = "BVTMachine44"
                        },
                        new AssignedMachine {
                            Id = "BVT1000002",
                            DisplayName = "BVTMachine22"
                        },
                        new AssignedMachine {
                            Id = "BVT1000003",
                            DisplayName = "BVTMachine33"
                        }
                    },
                    SubscriptionTypes = new [] {
                        "Customer"
                    }
                }
            }
        };

        private readonly Mock<ITokenProvider> _standardTokenProviderMock;

        public LicenseOverviewServiceTests()
        {
            _standardTokenProviderMock = new Mock<ITokenProvider>();
        }

        [Fact]
        public async Task GetSubscriptionsAsync_ReturnsMockedSubscriptions()
        {
            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.OK, TestSubscriptions);
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var licenseOverviewService = new LicenseOverviewService(httpClient, _standardTokenProviderMock.Object);

                var mockedSubscriptionOverview = await licenseOverviewService.GetSubscriptionsAsync(CancellationToken.None);

                mockedSubscriptionOverview.Should().BeOfType(typeof(SubscriptionOverview));
                mockedSubscriptionOverview.Should().BeEquivalentTo(_expectedSubscriptions);
                messageHandlerMock.VerifySendAsyncWasInvokedExactlyOnce();
            }
        }

        [Fact]
        public async Task GetSubscriptionsAsync_ThrowsExceptionWhenTapioReturnsErrorCode()
        {

            var messageHandlerMock = new Mock<HttpMessageHandler>()
                .SetupSendAsyncMethod(HttpStatusCode.Unauthorized, "{}");
            using (var httpClient = new HttpClient(messageHandlerMock.Object))
            {
                var licenseOverviewService = new LicenseOverviewService(httpClient, _standardTokenProviderMock.Object);

                Func<Task<SubscriptionOverview>> action = () => licenseOverviewService.GetSubscriptionsAsync(CancellationToken.None);
                await action.Should().ThrowAsync<HttpRequestException>();
            }
        }
    }
}
