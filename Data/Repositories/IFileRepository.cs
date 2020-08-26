using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Data.Entities;

namespace FileServer.Data.Repositories
{
    public interface IFileRepository
    {
        Task<IEnumerable<File>> GetAll();
        Task<File> Find(Guid id);
        Task<File> SaveFile(File input);
    }
}
