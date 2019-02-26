using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;

using Aitgmbh.Tapio.Developerapp.Web.Configurations;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Aitgmbh.Tapio.Developerapp.Web
{
    public class Startup
    {
        private readonly ILogger<Startup> _logger;

        public Startup(IConfiguration configuration, ILogger<Startup> logger)
        {
            _logger = logger;
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
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddHttpClient<IMachineOverviewService, MachineOverviewService>();
            services
                .AddOptions<TapioCloudCredentials>()
                .Bind(Configuration.GetSection("TapioCloud"))
                .ValidateDataAnnotations()
#pragma warning disable S4055 // Literals should not be passed as localized parameters
                .Validate(c => Guid.TryParse(c.ClientId, out _), @"The client secret must be a valid Guid");
#pragma warning restore S4055 // Literals should not be passed as localized parameters
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, OptionsValidator optionsValidator)
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
#pragma warning disable S4055 // Literals should not be passed as localized parameters
                    _logger.LogInformation("Rerouting from {SourceRoute} to {DestinationRoute}", path, context.Request.Path);
#pragma warning restore S4055 // Literals should not be passed as localized parameters
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

        [SuppressMessage("ReSharper", "AssignmentIsFullyDiscarded")]
        public void Validate()
        {
            _ = _tapioCloud.Value;
        }
    }
}
