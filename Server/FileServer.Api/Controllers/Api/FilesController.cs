using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using FileServer.Services;
using FileServer.Shared.ViewModels;
using FileServer.Shared.ViewModels.Exceptions;
using System;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace FileServer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
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

            MemoryStream ms = new MemoryStream(file.Content);
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

            //create file
            //return await _fileService.SaveFileAsync(uploadFile);
            return null;
        }

        [HttpGet("error")]
        public Task<ActionResult> Error()
        {
            throw new BadRequestException("You are wrong");
        }
    }
}
