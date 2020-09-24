using FileServer.Shared.ViewModels;
using System.Threading.Tasks;

namespace FileServer.Services
{
    public interface IFileContentService
    {
        Task SaveFileContent(FileContentViewModel viewModel);
    }
}
