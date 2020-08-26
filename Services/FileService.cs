using FileServer.Data.Repositories;
using FileServer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileEntity = FileServer.Data.Entities.File;

namespace FileServer.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;

        public FileService(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        public async Task<List<FileViewModel>> GetAll()
        {
            // TODO: use yield
            // UNDONE: add paging and sorting
            IEnumerable<FileEntity> fileEntities = await _fileRepository.GetAll();

            return fileEntities.Select(entity => new FileViewModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Type = entity.Type,
                ModifiedAt = entity.ModilfiedAt,
                ModifiedBy = entity.ModifiedBy
            }).ToList();
        }
    }
}
