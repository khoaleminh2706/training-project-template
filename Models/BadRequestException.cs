﻿using System;

namespace FileServer.Models
{
    public class BadRequestException: Exception
    {
        public BadRequestException(string message) : base(message)
        { }
    }
}
