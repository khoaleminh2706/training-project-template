using FileServer.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FileServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ServiceCollectionExtensions.FileServerService(services, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            //app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseCookiePolicy();

            app.UseAuthentication();

            app.Use(async (context, next) =>
            {
                if (context.User.Identity.IsAuthenticated)
                {
                    await next.Invoke();
                }
                else
                {
                    if (context.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                    {
                        // webapp will then do a location.reload() which triggers the auth
                        context.Response.StatusCode = 401;
                    }
                    else
                    {
                        string auth = context.Request.Headers["Authorization"];
                        if (string.IsNullOrEmpty(auth) || !auth.StartsWith("Bearer ", System.StringComparison.OrdinalIgnoreCase))
                        {
                            await context.ChallengeAsync();
                        }
                        else
                        {
                            await next.Invoke();
                        }
                    }
                }
            });

            app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
