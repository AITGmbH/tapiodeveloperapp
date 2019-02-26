using System;
using System.Runtime.InteropServices;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Events;

[assembly: CLSCompliant(false)]
[assembly: ComVisible(false)]

namespace Aitgmbh.Tapio.Developerapp.Web
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.File(
                    @"D:\home\LogFiles\Application\developerapp.txt",
                    fileSizeLimitBytes: 1_000_000,
                    rollOnFileSizeLimit: true,
                    shared: true,
                    flushToDiskInterval: TimeSpan.FromSeconds(1))
                .CreateLogger();

            try
            {
                CreateWebHostBuilder(args)
                    .Build()
                    .Run();
            }
#pragma warning disable S2221 // "Exception" should not be caught when not required by called methods, reason: we want to log every exception
            catch (Exception e)
#pragma warning restore S2221 // "Exception" should not be caught when not required by called methods
            {
                Log.Fatal(e, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost
                .CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((ctx, builder) =>
                {
                    builder
                        .SetBasePath(ctx.HostingEnvironment.ContentRootPath)
                        .AddJsonFile("appsettings.json", true, true)
                        .AddJsonFile(FormattableString.Invariant($"appsettings.{ctx.HostingEnvironment.EnvironmentName}.json"), true, true)
                        .AddEnvironmentVariables();

                    if (ctx.HostingEnvironment.IsDevelopment())
                    {
                        builder.AddUserSecrets(typeof(Program).Assembly);
                    }
                })
                .UseSerilog()
                .UseStartup<Startup>();
    }
}
