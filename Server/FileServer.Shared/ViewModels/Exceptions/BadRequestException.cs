using System;

namespace FileServer.Shared.ViewModels.Exceptions
{
    public class BadRequestException: Exception
    {
        public BadRequestException(string message) : base(message)
        { }
    }
}
