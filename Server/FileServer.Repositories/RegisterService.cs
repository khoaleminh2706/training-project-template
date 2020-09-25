using FileServer.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RegisterService
    {
        public static IServiceCollection RegisterRepositories(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")
                );
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IErrorRepository, ErrorRepository>();
            services.AddScoped<IFileContentRepository, FileContentRepository>();
            return services;
        }
    }
}
