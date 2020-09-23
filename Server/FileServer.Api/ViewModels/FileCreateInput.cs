namespace FileServer.Models
{
    public class FileCreateInput
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Extension { get; set; }
        public string ParenId { get; set; }
    }
}
