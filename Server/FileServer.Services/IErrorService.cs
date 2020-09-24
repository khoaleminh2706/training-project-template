using System.Threading.Tasks;

namespace FileServer.Services
{
    public interface IErrorService
    {
        Task SaveError(string message, string content, string userId);
    }
}
