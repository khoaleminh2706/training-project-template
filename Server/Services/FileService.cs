using FileServer.Data.Repositories;
using FileServer.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
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
                Extension = entity.Extension,
                ModifiedAt = entity.ModilfiedAt,
                ModifiedBy = entity.ModifiedBy
            }).ToList();
        }

        public async Task<FileViewModel> Find(Guid id)
        {
            var result = await _fileRepository.Find(id);

            return new FileViewModel
            {
                Id = result.Id,
                Name = result.Name,
                Type = result.Type,
                Extension = result.Extension,
                Content = result.Content,
                ModifiedAt = result.ModilfiedAt,
                ModifiedBy = result.ModifiedBy
            };
        }

        public async Task<FileViewModel> SaveFile(IFormFile file)
        {
            byte[] buffer = null;
            using (MemoryStream ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                buffer = new byte[ms.Length];
                buffer = ms.ToArray();
            }

            // get file extension
            var fileExtension = Path.GetExtension(file.FileName);


            var fileEntity = await _fileRepository.SaveFile(new FileEntity
            {
                Name = file.FileName,
                Type = "file",
                Content = buffer,
                ParentId = null,
                Extension = fileExtension,
                CreatedAt  = DateTime.UtcNow.AddHours(7),
                ModilfiedAt = DateTime.UtcNow.AddHours(7)
            });

            return new FileViewModel 
            { 
                Id = fileEntity.Id,
                Type = fileEntity.Type,
                Content = fileEntity.Content,
                ModifiedAt = fileEntity.ModilfiedAt,
                ModifiedBy = fileEntity.ModifiedBy
            };
        }

        public async Task<FileViewModel> Delete(string id)
        {
            Guid guid = new Guid(id);
            var fileEntity = await _fileRepository.Delete(guid);

            // TODO: Check if has childs

            return new FileViewModel
            {
                Id = fileEntity.Id,
                Type = fileEntity.Type,
                Content = fileEntity.Content,
                ModifiedAt = fileEntity.ModilfiedAt,
                ModifiedBy = fileEntity.ModifiedBy
            };
        }

        public async Task<FileViewModel> AddFolder(string name)
        {
            var fileEntity = await _fileRepository.Add(name);

            return new FileViewModel
            {
                Id = fileEntity.Id,
                Type = fileEntity.Type,
                Content = fileEntity.Content,
                ModifiedAt = fileEntity.ModilfiedAt,
                ModifiedBy = fileEntity.ModifiedBy
            };
        }
    }
}
