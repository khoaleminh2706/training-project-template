using FileServer.Repositories.Entities;
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

        public async Task<File> FindAsync(Guid id)
        {
            return await _context.Files.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<File>> GetAllAsync()
        {
            var files = await _context.Files.OrderBy(e => e.CreatedAt).ToListAsync();
            var ids = await _context.UserDatas.Where(u => files.Select(f => f.ModifiedBy).Distinct().Contains(u.Id)).ToListAsync();
            return files.Select(f =>
            {
                f.ModifiedBy = ids.FirstOrDefault(id => id.Id == f.ModifiedBy).DisplayName;
                return f;
            }).ToList();
        }

        public async Task<File> AddFileAsync(File input)
        {
            // FIXME: Build a service to get userid instead
            //var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //input.ModifiedBy = userId;
            //input.CreatedBy = userId;
            _context.Files.Add(input);
            await _context.SaveChangesAsync();
            return input;
        }

        public async Task<File> Delete(Guid id)
        {
            var fileToDelete = await FindAsync(id);
            if (fileToDelete == null)
            {
                throw new NotFoundException("Không tìm thấy file");
            }
            _context.Files.Remove(fileToDelete);
            await _context.SaveChangesAsync();

            return fileToDelete;
        }

        public async Task<File> AddFolderAsync(string name)
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
            return newFolder;
        }

    }
}
