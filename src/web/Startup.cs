using System;
using System.IO;

using Aitgmbh.Tapio.Developerapp.Web.Configurations;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricalData;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.HistoricConditions;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Aitgmbh.Tapio.Developerapp.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddSingleton<IScenarioCrawler, ScenarioCrawler>()
                .AddSingleton<IScenarioRepository, ScenarioRepository>()
                .AddSingleton<ITokenProvider, TokenProvider>()
                .AddSingleton<OptionsValidator>()
                .AddSingleton<IEvenHubCredentialProvider, EventHubCredentialProvider>()
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddHttpClient<IMachineOverviewService, MachineOverviewService>();
            services.AddHttpClient<IHistoricalDataService, HistoricalDataService>();
            services.AddHttpClient<IHistoricConditionsService, HistoricConditionsService>();
            services
                .AddOptions<TapioCloudCredentials>()
                .Bind(Configuration.GetSection("TapioCloud"))
                .ValidateDataAnnotations()
                .Validate(c => Guid.TryParse(c.ClientId, out _), @"The client secret must be a valid Guid");
            services
                .AddOptions<EventHubCredentials>()
                .Bind(Configuration.GetSection("EventHub"))
                .ValidateDataAnnotations();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
#pragma warning disable S2325 // Methods and properties that don't access instance data should be static
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, OptionsValidator optionsValidator)
#pragma warning restore S2325 // Methods and properties that don't access instance data should be static
        {
            if (optionsValidator == null)
            {
                throw new ArgumentNullException(nameof(optionsValidator));
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            optionsValidator.Validate();

            app.Use(async (context, next) =>
            {
                var path = context.Request.Path;
                if (!path.StartsWithSegments("/api", StringComparison.Ordinal) && !path.StartsWithSegments("/hubs", StringComparison.Ordinal) && !Path.HasExtension(path))
                {
                    context.Request.Path = "/index.html";
                }

                await next();
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }

    /// <summary>
    /// Provides fail fast behavior for configurations on start up.
    /// </summary>
    public class OptionsValidator
    {
        private readonly IOptions<TapioCloudCredentials> _tapioCloud;

        public OptionsValidator(IOptions<TapioCloudCredentials> tapioCloud)
        {
            _tapioCloud = tapioCloud;
        }

        public void Validate()
        {
            _ = _tapioCloud.Value;
        }
    }
}
