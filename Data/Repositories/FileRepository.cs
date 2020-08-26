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

        public Task<File> Create(FileCreateInput input, byte[] fileBytes)
        {
            throw new NotImplementedException();
        }

        public Task<string> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<File> Update(int id)
        {
            throw new NotImplementedException();
        }
    }
}
