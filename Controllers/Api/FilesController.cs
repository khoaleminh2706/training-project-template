using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.IO;
using FileServer.Services;
using FileServer.Models;

namespace FileServer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
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

        [HttpPost]
        public async Task<byte[]> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new System.Exception();
            }

            byte[] buffer = null;

            using (MemoryStream ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                buffer = new byte[ms.Length];
                buffer = ms.ToArray();
            }
            return buffer;
        }
    }
}
