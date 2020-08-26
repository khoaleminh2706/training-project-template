using Microsoft.AspNetCore.Mvc;
using FileServer.Models.Exceptions;

namespace FileServer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        public FilesController()
        {

        }

        [HttpGet]
        public IActionResult Index()
        {
            throw new NotFoundException("ahihi");
        }
    }
}
