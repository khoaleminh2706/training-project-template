using FileServer.Repositories.Entities;
using FileServer.Shared.Models;
using FileServer.Shared.ViewModels.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileServer.Repositories
{
    internal class FileRepository : IFileRepository
    {
        private readonly ApplicationDbContext _context;

        public FileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FileModel> FindAsync(Guid id)
        {
            var result = await FindSingleAsync(id);

            return new FileModel
            {
                Id = result.Id,
                Name = result.Name,
                Type = result.Type,
                Extension = result.Extension,
                Content = result.Content,
                ParentId = result.ParentId,
                CreatedBy = result.CreatedBy,
                CreatedAt = result.CreatedAt
            };
        }

        private async Task<File> FindSingleAsync(Guid id)
        {
            return await _context.Files.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<FileModel>> GetAllAsync()
        {
            var files = await _context.Files.OrderBy(e => e.CreatedAt).ToListAsync();
            var ids = await _context.UserDatas.Where(u => files.Select(f => f.ModifiedBy).Distinct().Contains(u.Id)).ToListAsync();
            return files.Select(f => new FileModel
            {
                Id = f.Id,
                Name = f.Name,
                Type = f.Type,
                Extension = f.Extension,
                Content = f.Content,
                ParentId = f.ParentId,
                CreatedBy = f.CreatedBy,
                CreatedAt = f.CreatedAt
            }).ToList();
        }

        public async Task<FileModel> AddFileAsync(FileModel input)
        {
            // FIXME: Build a service to get userid instead
            //var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //input.ModifiedBy = userId;
            //input.CreatedBy = userId;
            File newFile = new File
            {
                Id = input.Id,
                Name = input.Name,
                Type = input.Type,
                Extension = input.Extension,
                Content = input.Content,
                ParentId = input.ParentId,
                CreatedBy = input.CreatedBy,
                CreatedAt = input.CreatedAt
            };
            _context.Files.Add(newFile);
            await _context.SaveChangesAsync();
            return input;
        }

        public async Task<FileModel> Delete(Guid id)
        {
            var fileToDelete = await FindSingleAsync(id);
            if (fileToDelete == null)
            {
                throw new NotFoundException("Không tìm thấy file");
            }
            _context.Files.Remove(fileToDelete);
            await _context.SaveChangesAsync();

            return new FileModel
            {
                Id = fileToDelete.Id,
                Name = fileToDelete.Name,
                Type = fileToDelete.Type,
                Extension = fileToDelete.Extension,
                Content = fileToDelete.Content,
                ParentId = fileToDelete.ParentId,
                CreatedBy = fileToDelete.CreatedBy,
                CreatedAt = fileToDelete.CreatedAt
            };
        }

        public async Task<FileModel> AddFolderAsync(string name)
        {
            var file = await _context.Files.FirstOrDefaultAsync(e => e.Name ==  name);
            if (file != null)
            {
                throw new BadRequestException("Folder đã tồn tại");
            }

            //var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // save
            File newFolder = new File
            {
                Id = Guid.NewGuid(),
                Name = name,
                Type = "folder",
                Content = null,
                Extension = null,
                //ModifiedBy = userId,
                //CreatedBy = userId,
                CreatedAt = DateTime.UtcNow.AddHours(7),
                ModilfiedAt = DateTime.UtcNow.AddHours(7)
            };
            _context.Files.Add(newFolder);
            await _context.SaveChangesAsync();
            return new FileModel
            {
                Id = newFolder.Id,
                Name = newFolder.Name,
                Type = newFolder.Type,
                Extension = newFolder.Extension,
                Content = newFolder.Content,
                ParentId = newFolder.ParentId,
                CreatedBy = newFolder.CreatedBy,
                CreatedAt = newFolder.CreatedAt
            };
        }

    }
}
