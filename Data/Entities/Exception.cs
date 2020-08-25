using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FileServer.Data.Entities
{
    public class Exception
    {
        public Exception()
        {

        }

        #region Properties
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        /// <summary>
        /// Error message 
        /// </summary>
        [Required]
        public string Message { get; set; }

        /// <summary>
        /// StrackTrace của lỗi
        /// </summary>
        [Required]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        /// <summary>
        /// user id
        /// </summary>
        // TODO: get id of current user
        public string  CreateBy { get; set; }
        #endregion
    }
}
