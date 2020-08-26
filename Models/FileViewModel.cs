using System;

namespace FileServer.Models
{
    // UNDONE: Hiển thị file ở dưới thư mục
    public class FileViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
    }
}
