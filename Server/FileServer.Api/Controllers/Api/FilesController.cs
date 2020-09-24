using FileServer.Services;
using FileServer.Shared.ViewModels;
using FileServer.Shared.ViewModels.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FileServer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IFileContentService _fileContentService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FilesController(
            IFileService fileService,
            IFileContentService fileContentService,
            IHttpContextAccessor httpContextAccessor)
        {
            _fileService = fileService;
            _fileContentService = fileContentService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<ActionResult<List<FileViewModel>>> GetFiles()
        {
            // TODO: paging and sorting
            var result = await _fileService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FileViewModel>> Get(string id)
        {
            Guid guid = new Guid(id);
            return await _fileService.FindAsync(guid);
        }

        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadFile(string id)
        {
            Guid guid = new Guid(id);
            var file = await _fileService.FindAsync(guid);

            var mediaHeaders = new Dictionary<string, string>(){
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".xls", "application/vnd.ms-excel"},
                {".pdf", "application/pdf"}
            };

            if (file.Extension == null || mediaHeaders[file.Extension] == null)
            {
                throw new Exception($"Không support file đuôi: {file.Extension}");
            }

            MemoryStream ms = null; // FIXME: new MemoryStream(file.Content);
            return new FileStreamResult(ms, mediaHeaders[file.Extension])
            {
                FileDownloadName = file.Name
            };
        }

        [HttpPost("folder")]
        public async Task<ActionResult<FileViewModel>> AddFolder([FromBody] FileCreateInput input)
        {
            return await _fileService.AddFolderAsync(input.Name);
        }

        [HttpPost]
        public async Task<ActionResult<FileViewModel>> Upload(IFormFile uploadFile)
        {
            // check file tồn tại
            if (uploadFile == null || uploadFile.Length == 0)
            {
                throw new BadRequestException("Thiếu file");
            }

            // get file extension
            var fileExtension = Path.GetExtension(uploadFile.FileName);
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            FileViewModel newFile = new FileViewModel
            {
                Name = uploadFile.FileName,
                Extension = fileExtension,
                Type = "file",
                CreatedBy = userId,
                ModifiedBy = userId
            };

            //create file
            newFile = await _fileService.SaveFileAsync(newFile);

            // save file content
            if (newFile != null)
            {
                
                var fileContent = await FileToBinaryCode(uploadFile);

                FileContentViewModel fileContentViewModel = new FileContentViewModel
                {
                    FileId = newFile.Id,
                    FileContent = fileContent
                };
                await _fileContentService.SaveFileContent(fileContentViewModel);
            }
            return newFile;
        }

        private async Task<byte[]> FileToBinaryCode(IFormFile formFile)
        {
            byte[] buffer = null;
            using (MemoryStream ms = new MemoryStream())
            {
                await formFile.CopyToAsync(ms);
                buffer = new byte[ms.Length];
                buffer = ms.ToArray();
            }
            return buffer;
        }
    }
}
