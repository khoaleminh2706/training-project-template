using AutoMapper;
using FileServer.Repositories.Entities;
using FileServer.Shared.Models;

namespace FileServer.Repositories.Mappings
{
    public class FileContentEntityToFileContentModel: Profile
    {
        public FileContentEntityToFileContentModel()
        {
            CreateMap<FileContent, FileContentModel>().ReverseMap();
        }
    }
}
