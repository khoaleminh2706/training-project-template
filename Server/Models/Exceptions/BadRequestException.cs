using System;

namespace FileServer.Models.Exceptions
{
    public class BadRequestException: Exception
    {
        public BadRequestException(string message) : base(message)
        { }
    }
}
