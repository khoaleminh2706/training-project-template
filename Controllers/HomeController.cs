using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileServer.Controllers
{
  public class HomeController : Controller
  {
    [Authorize]
    public ActionResult Index()
    {
      return Content("~/index.html");
    }
  }
}