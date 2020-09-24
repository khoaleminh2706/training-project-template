using System;
using System.ComponentModel.DataAnnotations;

namespace FileServer.Repositories.Entities
{
    internal class File
    {
        #region Properties
        [Key]
        [Required]
        internal Guid Id { get; set; }

        [Required]
        [Range(0, 100, ErrorMessage = "Tên File phải từ 0-100 ký tự")]
        internal string Name { get; set; }
        
        [Required]
        [MaxLength(6)]
        internal string Type { get; set; }
        
        /// <summary>
        /// Nếu Type là File thì có extension
        /// </summary>
        [MaxLength(5, ErrorMessage = "Phần đuôi file có nhiều nhất 5 ký tự")]
        internal string Extension { get; set; }

        /// <summary>
        /// Id của folder chứa nó
        /// Điều kiện: item của id này phải là folder
        /// </summary>
        internal Guid? ParentId { get; set; } = null;

        [Required]
        internal string CreatedBy { get; set; }

        [Required]
        internal DateTime CreatedAt { get; set; }

        [Required]
        internal string ModifiedBy { get; set; }

        [Required]
        internal DateTime ModilfiedAt { get; set; }
        
        internal FileContent FileContent { get; set; }
        #endregion
    }
}
