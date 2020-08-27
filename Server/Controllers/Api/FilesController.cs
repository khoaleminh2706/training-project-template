using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using FileServer.Services;
using FileServer.Models;
using FileServer.Models.Exceptions;
using System;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<List<FileViewModel>>> GetFiles ()
        {
            // TODO: paging and sorting
            var result = await _fileService.GetAll();
            return result;
        }

        public async Task<ActionResult<FileViewModel>> Get(string id)
        {
            Guid guid = new Guid(id);
            return await _fileService.Find(guid);
        }

        [HttpPost]
        public async Task<ActionResult<FileViewModel>> Upload(FileCreateInput input, IFormFile file)
        {
            if (input.Type == "folder")
            {

            }
            else
            {
                // check file tồn tại
                if (file == null || file.Length == 0)
                {
                    throw new BadRequestException("Thiếu file");
                }

                // check file 5MB

                //create file
                return await _fileService.SaveFile(file, input);
            }

            throw new BadRequestException("Không xác định loại file");
        }
    }
}
