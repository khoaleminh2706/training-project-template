using System;
using System.ComponentModel.DataAnnotations;

namespace FileServer.Repositories.Entities
{
    internal class FileContent
    {
        [Key]
        [Required]
        public Guid FileId { get; set; }

        /// <summary>
        /// File Content
        /// Nếu là file thì phải có 
        /// </summary>
        public byte[] Content { get; set; }

        public File File { get; set; }
    }
}
