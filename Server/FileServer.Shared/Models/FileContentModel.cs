using System;

namespace FileServer.Shared.Models
{
    public class FileContentModel
    {
        public Guid FileId { get; set; }
        public byte[] Content { get; set; }
    }
}
