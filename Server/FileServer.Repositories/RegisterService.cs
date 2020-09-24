using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FileServer.Repositories
{
    public static class RegisterService
    {
        public static IServiceCollection Register(IServiceCollection services, IConfiguration configuration)
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
