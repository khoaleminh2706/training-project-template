using AutoMapper;
using FileServer.Repositories;
using FileServer.Shared.Models;
using FileServer.Shared.ViewModels;
using System.Threading.Tasks;

namespace FileServer.Services
{
    internal class FileContentService : IFileContentService
    {
        private readonly IFileContentRepository _fileContentRepository;
        private readonly IMapper _mapper;

        public FileContentService(IFileContentRepository fileContentRepository, IMapper mapper)
        {
            _fileContentRepository = fileContentRepository;
            _mapper = mapper;
        }

        public async Task SaveFileContent(FileContentViewModel viewModel)
        {
            var contentToAdd = _mapper.Map<FileContentModel>(viewModel);
            await _fileContentRepository.SaveFile(contentToAdd);
        }
    }
}
