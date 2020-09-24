using AutoMapper;
using FileServer.Shared.Models;
using FileServer.Shared.ViewModels;

namespace FileServer.Services.Mappings
{
    public class FileModelToFileViewModelProfile: Profile
    {
        public FileModelToFileViewModelProfile()
        {
            CreateMap<FileModel, FileViewModel>();
        }
    }
}
