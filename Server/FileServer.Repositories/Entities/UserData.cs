using System.ComponentModel.DataAnnotations;

namespace FileServer.Repositories.Entities
{
    internal class UserData
    {
        [Key]
        public string Id { get; set; }
        public string DisplayName { get; set; }
    }
}
