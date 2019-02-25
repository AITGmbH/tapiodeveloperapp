using System;
using System.Runtime.InteropServices;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

[assembly: CLSCompliant(false)]
[assembly: ComVisible(false)]

namespace Aitgmbh.Tapio.Developerapp.Web
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
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
                .UseStartup<Startup>();
    }
}
