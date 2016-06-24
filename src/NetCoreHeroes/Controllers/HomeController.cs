using Microsoft.AspNetCore.Mvc;

namespace NetCoreHeroes.Controllers
{
    [Route("/")]
    public class HomeController : Controller
    {
        [Route("/{*angularUrl}")]
        public IActionResult Index(string angularUrl)
        {
            ViewData["AngularBase"] = Url.Action(nameof(Index), new { angularUrl = string.Empty });
            return View();
        }
    }
}
