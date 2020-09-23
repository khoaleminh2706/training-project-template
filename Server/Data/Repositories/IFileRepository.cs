using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Data.Entities;

namespace FileServer.Data.Repositories
{
    public interface IFileRepository
    {
        Task<IEnumerable<File>> GetAllAsync();
        Task<File> FindAsync(Guid id);
        Task<File> AddFolderAsync(string folderName);
        Task<File> AddFileAsync(File input);
        Task<File> Delete(Guid id);
    }
}
