using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Data.Entities;
using FileServer.Models;

namespace FileServer.Data.Repositories
{
    public interface IFileRepository
    {
        Task<IEnumerable<File>> GetAll();
        Task<File> Get(int id);
        Task<File> Create(FileCreateInput input, byte[] fileBytes);
        Task<File> Update(int id);
        Task<string> Delete(int id);
    }
}
