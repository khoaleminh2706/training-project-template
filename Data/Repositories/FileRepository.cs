using FileServer.Data.Entities;
using FileServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            return await _context.Files.Where(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<File>> GetAll()
        {
            return await _context.Files.AsNoTracking().ToListAsync();
        }

        public async Task<File> SaveFile(File input)
        {
            _context.Files.Add(input);
            await _context.SaveChangesAsync();
            return input;
        }
    }
}
