using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using FileServer.Services;
using FileServer.Models;
using FileServer.Models.Exceptions;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

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
            var result = await _fileService.GetAll();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FileViewModel>> Get(string id)
        {
            Guid guid = new Guid(id);
            return await _fileService.Find(guid);
        }

        [HttpPost("folder")]
        public async Task<ActionResult<FileViewModel>> AddFolder([FromBody] FileCreateInput input)
        {
            return await _fileService.AddFolder(input.Name);
        }

        [HttpPost]
        public async Task<ActionResult<FileViewModel>> Upload(IFormFile uploadFile)
        {
            // check file tồn tại
            if (uploadFile == null || uploadFile.Length == 0)
            {
                throw new BadRequestException("Thiếu file");
            }

            // TODO: check file 2MB
            if (uploadFile.Length > 2097152)
            {
                throw new BadRequestException("File không được lớn hơn 2MB");
            }
            
            //create file
            return await _fileService.SaveFile(uploadFile);
        }

        [HttpGet("error")]
        public Task<ActionResult> Error()
        {
            throw new BadRequestException("You are wrong");
        }
    }
}
