using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FileServer.Services
{
    public static class RegisterService
    {
        public static IServiceCollection Register(IServiceCollection services, IConfiguration configuration)
        {
            Repositories.RegisterService.Register(services, configuration);
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IErrorService, ErrorService>();
            services.AddScoped<IFileContentService, FileContentService>();
            return services;
        }
    }
}
