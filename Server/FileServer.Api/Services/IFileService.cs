using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Shared.ViewModels;
using Microsoft.AspNetCore.Http;

namespace FileServer.Services
{
    public interface IFileService
    {
        Task<List<FileViewModel>> GetAllAsync();
        Task<FileViewModel> FindAsync(Guid id);
        Task<FileViewModel> AddFolderAsync(string name);
        Task<FileViewModel> SaveFileAsync(IFormFile file);
        Task<FileViewModel> DeleteAsync(string id);
    }
}
