using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FileServer.Services
{
    public static class RegisterService
    {
        public static IServiceCollection Register(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IFileService, FileService>();
            Repositories.RegisterService.Register(services, configuration);
            return services;
        }
    }
}
