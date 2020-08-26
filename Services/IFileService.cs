using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Models;

namespace FileServer.Services
{
    public interface IFileService
    {
        Task<List<FileViewModel>> GetAll();
    }
}
