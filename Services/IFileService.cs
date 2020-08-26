using System.Collections.Generic;
using System.Threading.Tasks;
using FileServer.Models;
using Microsoft.AspNetCore.Http;

namespace FileServer.Services
{
    public interface IFileService
    {
        Task<List<FileViewModel>> GetAll();
        Task<FileViewModel> SaveFile(IFormFile inputFile, FileCreateInput input);
    }
}
