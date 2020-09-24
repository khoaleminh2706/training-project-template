using AutoMapper;
using FileServer.Repositories;
using FileServer.Shared.Models;
using FileServer.Shared.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FileServer.Services
{
    internal class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;

        public FileService(IFileRepository fileRepository, IMapper mapper)
        {
            _fileRepository = fileRepository;
            _mapper = mapper;
        }

        public async Task<List<FileViewModel>> GetAllAsync()
        {
            // TODO: use yield
            // UNDONE: add paging and sorting
            List<FileModel> result = await _fileRepository.GetAllAsync();
            return _mapper.Map<List<FileModel>, List<FileViewModel>>(result);
        }

        public async Task<FileViewModel> FindAsync(Guid id)
        {
            var result = await _fileRepository.FindAsync(id);

            return new FileViewModel
            {
                Id = result.Id,
                Name = result.Name,
                Type = result.Type,
                Extension = result.Extension,
                ModifiedAt = result.ModilfiedAt,
                ModifiedBy = result.ModifiedBy
            };
        }

        public async Task<FileViewModel> SaveFileAsync(FileViewModel file)
        {
            var fileToAdd = _mapper.Map<FileModel>(file);
            var fileEntity = await _fileRepository.AddFileAsync(fileToAdd);
            var result = _mapper.Map<FileViewModel>(fileEntity);
            return result;
        }

        public async Task<FileViewModel> DeleteAsync(string id)
        {
            Guid guid = new Guid(id);
            var fileEntity = await _fileRepository.Delete(guid);

            // TODO: Check if has childs
            var result = _mapper.Map<FileViewModel>(fileEntity);
            return result;
        }

        public async Task<FileViewModel> AddFolderAsync(string name)
        {
            var fileEntity = await _fileRepository.AddFolderAsync(name);

            return new FileViewModel
            {
                Id = fileEntity.Id,
                Name = fileEntity.Name,
                Type = fileEntity.Type,
                ModifiedAt = fileEntity.ModilfiedAt,
                ModifiedBy = fileEntity.ModifiedBy
            };
        }
    }
}
