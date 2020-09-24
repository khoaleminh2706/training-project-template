using AutoMapper;
using FileServer.Repositories.Entities;
using FileServer.Shared.Models;

namespace FileServer.Repositories.Mappings
{
    public class FileEntityToFileModelProfile : Profile
    {
        public FileEntityToFileModelProfile()
        {
            CreateMap<File, FileModel>().ReverseMap();
        }
    }
}
