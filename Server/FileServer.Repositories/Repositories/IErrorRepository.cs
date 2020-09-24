using FileServer.Shared.Models;
using System.Threading.Tasks;

namespace FileServer.Repositories
{
    public interface IErrorRepository
    {
        Task SaveLog(ErrorModel model);
    }
}
