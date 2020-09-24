using FileServer.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace FileServer.Repositories
{
    public static class RegisterService
    {
        public static IServiceCollection Register(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(
                    "Server=DESKTOP-NIPNEO2\\KHOA;Database=TrainingApp;User Id=sa;Password=Khoa276@;Integrated Security=False;MultipleActiveResultSets=True"
                );
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            services.AddScoped<IFileRepository, FileRepository>();
            return services;
        }
    }
}
