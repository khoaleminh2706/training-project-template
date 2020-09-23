using System;

namespace FileServer.Shared.Models
{
    public class FileModel
    {
        #region Properties
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        /// <summary>
        /// Nếu Type là File thì có extension
        /// </summary>
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
        public Guid? ParentId { get; set; } = null;

        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime ModilfiedAt { get; set; }

        #endregion
    }
}
