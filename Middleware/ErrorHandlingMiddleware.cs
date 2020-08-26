using FileServer.Data;
using FileServer.Data.Entities;
using FileServer.Models.Exceptions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace FileServer.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IWebHostEnvironment env, ApplicationDbContext dbContext)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, env, dbContext);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception, IWebHostEnvironment env, ApplicationDbContext dbContext)
        {
            HttpStatusCode status;
            string message;
            var stackTrace = String.Empty;

            var exceptionType = exception.GetType();
            if (exceptionType == typeof(BadRequestException))
            {
                message = exception.Message;
                status = HttpStatusCode.BadRequest;
            }
            else if (exceptionType == typeof(NotFoundException))
            {
                message = exception.Message;
                status = HttpStatusCode.NotFound;
            }
            else
            {
                status = HttpStatusCode.InternalServerError;
                message = exception.Message;
                if (env.IsEnvironment("Development"))
                    stackTrace = exception.StackTrace;
            }

            // Save errors to database
            Error errorEntity = new Error()
            {
                Message = exception.Message,
                Content = exception.StackTrace,
                CreateBy = "me"
            };
            dbContext.Errors.Add(errorEntity);
            await dbContext.SaveChangesAsync();

            var result = JsonSerializer.Serialize(new { error = message, stackTrace });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)status;
            await context.Response.WriteAsync(result);
        }
    }
}
