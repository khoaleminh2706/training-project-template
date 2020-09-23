using System;

namespace FileServer.Shared.ViewModels.Exceptions
{
    public class NotFoundException: Exception
    {
        public NotFoundException(string message): base(message)
        {

        }
    }
}
