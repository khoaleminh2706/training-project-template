using System;
using System.ComponentModel.DataAnnotations;

namespace FileServer.Repositories.Entities
{
    internal class FileContent
    {
        [Key]
        [Required]
        internal Guid FileId { get; set; }

        /// <summary>
        /// File Content
        /// Nếu là file thì phải có 
        /// </summary>
        internal byte[] Content { get; set; }

        internal File File { get; set; }
    }
}
