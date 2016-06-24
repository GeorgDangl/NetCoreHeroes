using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NetCoreHeroes.Data;

namespace NetCoreHeroes.Controllers
{
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        private readonly HeroesContext _context;
        public HeroesController(HeroesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var heroes = _context.Heroes;
            return Ok(heroes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var hero = _context.Heroes
                .FirstOrDefault(dbHero => dbHero.Id == id);
            if (hero == null)
            {
                return NotFound();
            }
            return Ok(hero);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Hero updatedHero)
        {
            if (updatedHero == null || id != updatedHero.Id)
            {
                return BadRequest();
            }
            var hero = _context.Heroes.FirstOrDefault(dbHero => dbHero.Id == updatedHero.Id);
            if (hero == null)
            {
                return NotFound();
            }
            hero.Name = updatedHero.Name;
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public IActionResult IActionResult([FromBody]Hero newHero)
        {
            if (string.IsNullOrWhiteSpace(newHero.Name))
            {
                return BadRequest(new {error = "Hero must have a name!"});
            }
            _context.Heroes.Add(new Hero
            {
                Name = newHero.Name
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var hero = _context.Heroes.FirstOrDefault(dbHero => dbHero.Id == id);
            if (hero == null)
            {
                return NotFound();
            }
            _context.Heroes.Remove(hero);
            _context.SaveChanges();
            return Ok();
        }
    }
}
