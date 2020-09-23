using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Shared.ViewModels;

namespace FileServer.Services
{
    public interface IFileService
    {
        Task<List<FileViewModel>> GetAllAsync();
        Task<FileViewModel> FindAsync(Guid id);
        Task<FileViewModel> AddFolderAsync(string name);
        // FIXME: only pass file input
        //Task<FileViewModel> SaveFileAsync(IFormFile file);
        Task<FileViewModel> DeleteAsync(string id);
    }
}
