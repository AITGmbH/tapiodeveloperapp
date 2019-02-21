using System;
using System.IO;
using Aitgmbh.Tapio.Developerapp.Web.Repositories;
using Aitgmbh.Tapio.Developerapp.Web.Scenarios.MachineOverview;
using Aitgmbh.Tapio.Developerapp.Web.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Aitgmbh.Tapio.Developerapp.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
#pragma warning disable S2325 // Methods and properties that don't access instance data should be static
        public void ConfigureServices(IServiceCollection services)
#pragma warning restore S2325 // Methods and properties that don't access instance data should be static
        {
            services
                .AddSingleton<IScenarioCrawler, ScenarioCrawler>()
                .AddSingleton<IScenarioRepository, ScenarioRepository>()
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddHttpClient<IMachineOverviewService, MachineOverviewService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
#pragma warning disable S2325 // Methods and properties that don't access instance data should be static
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
#pragma warning restore S2325 // Methods and properties that don't access instance data should be static
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

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
}
