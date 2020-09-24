using FileServer.Shared.Models;
using System.Threading.Tasks;

namespace FileServer.Repositories
{
    public interface IFileContentRepository
    {
        Task SaveFile(FileContentModel model);
    }
}
