using FileServer.Repositories;
using FileServer.Shared.Models;
using System.Threading.Tasks;

namespace FileServer.Services
{
    public class ErrorService : IErrorService
    {
        private readonly IErrorRepository _errorRepository;

        public ErrorService(IErrorRepository errorRepository)
        {
            _errorRepository = errorRepository;
        }

        public async Task SaveError(string message, string content, string userId)
        {
            ErrorModel errorModel = new ErrorModel
            {
                Message = message,
                Content = content,
                CreateBy = userId
            };

            await _errorRepository.SaveLog(errorModel);
        }
    }
}
