using AutoMapper;
using FileServer.Repositories.Entities;
using FileServer.Shared.Models;
using System.Threading.Tasks;

namespace FileServer.Repositories
{
    internal class ErrorRepository : IErrorRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ErrorRepository(
            ApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task SaveLog(ErrorModel model)
        {
            var errorToAdd = _mapper.Map<Error>(model);
            _context.Errors.Add(errorToAdd);
            await _context.SaveChangesAsync();
        }
    }
}
