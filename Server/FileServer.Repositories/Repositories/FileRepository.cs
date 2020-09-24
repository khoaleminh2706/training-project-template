using AutoMapper;
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
        private readonly IMapper _mapper;

        public FileRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<FileModel> FindAsync(Guid id)
        {
            var fileItem = await FindSingleAsync(id);

            return _mapper.Map<FileModel>(fileItem);
        }

        private async Task<File> FindSingleAsync(Guid id)
        {
            return await _context.Files.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<List<FileModel>> GetAllAsync()
        {
            var files = await _context.Files.OrderBy(e => e.CreatedAt).ToListAsync();

            var result = _mapper.Map<List<FileModel>>(files);
            return result;
        }

        public async Task<FileModel> AddFileAsync(FileModel input)
        {
            // FIXME: Build a service to get userid instead
            //var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //input.ModifiedBy = userId;
            //input.CreatedBy = userId;

            File newFile = _mapper.Map<File>(input);
            _context.Files.Add(newFile);
            await _context.SaveChangesAsync();
            input = _mapper.Map<FileModel>(newFile);
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

            return _mapper.Map<FileModel>(fileToDelete);
        }

        public async Task<FileModel> AddFolderAsync(string name)
        {
            var file = await _context.Files.FirstOrDefaultAsync(e => e.Name ==  name);
            if (file != null)
            {
                throw new BadRequestException("Folder đã tồn tại");
            }

            // FIXME: phải làm cho được.
            //var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            File newFolder = _mapper.Map<File>(file);
            _context.Files.Add(newFolder);
            await _context.SaveChangesAsync();
            return _mapper.Map<FileModel>(newFolder);
        }
    }
}
