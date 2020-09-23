﻿using FileServer.Repositories.Entities;
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
                //options.UseSqlServer(
                //    configuration.GetConnectionString("DefaultConnection")
                //);
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });

            services.AddScoped<IFileRepository, FileRepository>();
            return services;
        }
    }
}