using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace FileServer.Controllers
{
    public class HomeController : Controller
  {
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
      _logger = logger;
    }

    [Authorize]
    public IActionResult Index()
    {
      return File("~/index.html", "text/html");
    }
  }
}
