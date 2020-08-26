using FileServer.Data.Entities;
using FileServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public Task<File> Get(int id)
        {
            throw new NotImplementedException();
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
