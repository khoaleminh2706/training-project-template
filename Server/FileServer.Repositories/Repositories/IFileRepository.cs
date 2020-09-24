using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Shared.Models;

namespace FileServer.Repositories
{
    public interface IFileRepository
    {
        Task<List<FileModel>> GetAllAsync();
        Task<FileModel> FindAsync(Guid id);
        Task<FileModel> AddFolderAsync(string folderName);
        Task<FileModel> AddFileAsync(FileModel input);
        Task<FileModel> Delete(Guid id);
    }
}
