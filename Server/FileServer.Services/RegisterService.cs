using FileServer.Services;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RegisterService
    {
        public static IServiceCollection RegisterServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.RegisterRepositories(configuration);
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IErrorService, ErrorService>();
            services.AddScoped<IFileContentService, FileContentService>();
            return services;
        }
    }
}
