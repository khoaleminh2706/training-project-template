using System;

namespace FileServer.Shared.ViewModels
{
    public class FileContentViewModel
    {
        public Guid FileId { get; set; }
        public byte[] FileContent { get; set; }
    }
}
