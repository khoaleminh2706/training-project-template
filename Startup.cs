using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

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
      // services.Configure<CookiePolicyOptions>(options =>
      //   {
      //     // This lambda determines whether user consent for non-essential cookies is needed for a given request.
      //     options.CheckConsentNeeded = context => true;
      //     options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
      //   });


      services.AddAuthentication(AzureADDefaults.AuthenticationScheme)
              .AddAzureAD(options => Configuration.Bind("AzureAd", options));

      // services.Configure<OpenIdConnectOptions>(AzureADDefaults.OpenIdScheme, options =>
      // {
      //   options.Authority = options.Authority + "/v2.0/";         // Microsoft identity platform

      //   options.TokenValidationParameters.ValidateIssuer = false; // accept several tenants (here simplified)
      // });

      // services.AddControllers(options =>
      // {
      //   // options.EnableEndpointRouting = false;
      //   var policy = new AuthorizationPolicyBuilder()
      //            .RequireAuthenticatedUser()
      //            .Build();
      //   options.Filters.Add(new AuthorizeFilter(policy));
      // });
      services.AddControllers();

      services.AddHttpsRedirection(options =>
  {
    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
    options.HttpsPort = 5001;
  });
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
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();

      app.UseRouting();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
          name: "default",
          pattern: "{controller=Home}/{action=Index}/{id?}"
        );
      });
    }
  }
}
