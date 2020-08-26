using Microsoft.AspNetCore.Mvc;
using FileServer.Models;

namespace FileServer.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        public FileController()
        {

        }

        [HttpGet]
        public IActionResult Index()
        {
            throw new NotFoundException("ahihi");
        }
    }
}
