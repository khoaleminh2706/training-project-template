using AutoMapper;
using FileServer.Repositories.Entities;
using FileServer.Shared.Models;
using System.Threading.Tasks;

namespace FileServer.Repositories
{
    internal class FileContentRepository : IFileContentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FileContentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task SaveFile(FileContentModel model)
        {
            FileContent newFileContent = _mapper.Map<FileContent>(model);
            _context.FileContent.Add(newFileContent);
            await _context.SaveChangesAsync();
        }
    }
}
