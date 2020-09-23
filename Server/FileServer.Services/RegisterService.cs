using Microsoft.Extensions.DependencyInjection;

namespace FileServer.Services
{
    public static class RegisterService
    {
        public static IServiceCollection Register(IServiceCollection services)
        {
            services.AddScoped<IFileService, FileService>();
            Repositories.RegisterService.Register(services);
            return services;
        }
    }
}
