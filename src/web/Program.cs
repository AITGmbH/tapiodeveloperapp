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
#pragma warning disable S1075 // URIs should not be hardcoded
        private const string AzureLogFilePath = @"D:\home\LogFiles\Application\developerapp.txt";
#pragma warning restore S1075 // URIs should not be hardcoded

        private const int MaxSingleLogFileSize = 1_000_000;

        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.File(
                    AzureLogFilePath,
                    fileSizeLimitBytes: MaxSingleLogFileSize,
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
#pragma warning disable S4055 // Literals should not be passed as localized parameters
                Log.Fatal(e, "Host terminated unexpectedly");
#pragma warning restore S4055 // Literals should not be passed as localized parameters
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
                .UseSerilog((ctx, loggerConfiguration) =>
                {
                    loggerConfiguration
                        .ReadFrom.Configuration(ctx.Configuration)
                        .Enrich.FromLogContext()
                        .WriteTo.Console()
                        .WriteTo.File(
                            AzureLogFilePath,
                            fileSizeLimitBytes: MaxSingleLogFileSize,
                            rollOnFileSizeLimit: true,
                            shared: true,
                            flushToDiskInterval: TimeSpan.FromSeconds(1));
                })
                .UseStartup<Startup>();
    }
}
