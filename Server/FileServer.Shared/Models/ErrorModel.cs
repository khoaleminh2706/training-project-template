using System;

namespace FileServer.Shared.Models
{
    public class ErrorModel
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(7);
        public string  CreateBy { get; set; }
    }
}
