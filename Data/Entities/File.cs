using System;
using System.ComponentModel.DataAnnotations;

namespace FileServer.Data.Entities
{
    public class File
    {
        public File()
        {

        }

        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        [Range(0, 100, ErrorMessage = "Tên File phải từ 0-100 ký tự")]
        public string Name { get; set; }
        
        [Required]
        [MaxLength(6)]
        public string Type { get; set; }
        
        /// <summary>
        /// Nếu Type là File thì có extension
        /// </summary>
        [MaxLength(5, ErrorMessage = "Phần đuôi file có nhiều nhất 5 ký tự")]
        public string Extension { get; set; }

        /// <summary>
        /// File Content
        /// Nếu là file thì phải có 
        /// </summary>
        public byte[] Content { get; set; }

        /// <summary>
        /// Id của folder chứa nó
        /// Điều kiện: item của id này phải là folder
        /// </summary>
        public Guid ParentId { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public string ModifiedBy { get; set; }

        [Required]
        public DateTime ModilfiedAt { get; set; }
        
        #endregion
    }
}
