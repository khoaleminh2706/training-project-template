using FileServer.Data.Entities;
using FileServer.Models.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileServer.Data.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly ApplicationDbContext _context;

        public FileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<File> Find(Guid id)
        {
            return await _context.Files.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<File>> GetAll()
        {
            return await _context.Files.ToListAsync();
        }

        public async Task<File> SaveFile(File input)
        {
            _context.Files.Add(input);
            await _context.SaveChangesAsync();
            return input;
        }

        public async Task<File> Delete(Guid id)
        {
            var fileToDelete = await Find(id);
            if (fileToDelete == null)
            {
                throw new NotFoundException("Không tìm thấy file");
            }
            _context.Files.Remove(fileToDelete);
            await _context.SaveChangesAsync();

            return fileToDelete;
        }
    }
}
