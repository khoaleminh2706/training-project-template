using AutoMapper;
using FileServer.Shared.Models;
using FileServer.Shared.ViewModels;

namespace FileServer.Services.Mappings
{
    public class FileContentModelToFileContentViewModelProfile: Profile
    {
        public FileContentModelToFileContentViewModelProfile()
        {
            CreateMap<FileContentViewModel, FileContentModel>();
        }
    }
}
