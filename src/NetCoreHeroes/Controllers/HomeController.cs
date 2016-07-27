using Microsoft.AspNetCore.Mvc;

namespace NetCoreHeroes.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(string angularUrl)
        {
            ViewData["AngularBase"] = Url.Action(nameof(Index), new { angularUrl = string.Empty });
            return View();
        }
    }
}
