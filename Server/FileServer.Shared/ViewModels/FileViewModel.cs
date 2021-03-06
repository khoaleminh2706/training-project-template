﻿using System;

namespace FileServer.Shared.ViewModels
{
    // UNDONE: Hiển thị file ở dưới thư mục
    public class FileViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Extension { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string ModifiedBy { get; set; }
    }
}
