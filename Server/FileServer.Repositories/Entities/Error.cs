using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FileServer.Repositories.Entities
{
    internal class Error
    {
        public Error()
        {

        }

        #region Properties
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        internal int Id { get; set; }
        
        /// <summary>
        /// Error message 
        /// </summary>
        [Required]
        internal string Message { get; set; }

        /// <summary>
        /// StrackTrace của lỗi
        /// </summary>
        [Required]
        internal string Content { get; set; }

        internal DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(7);

        /// <summary>
        /// user id
        /// </summary>
        // TODO: get id of current user
        internal string  CreateBy { get; set; }
        #endregion
    }
}
