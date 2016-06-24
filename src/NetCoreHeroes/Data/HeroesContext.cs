using Microsoft.EntityFrameworkCore;

namespace NetCoreHeroes.Data
{
    public class HeroesContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; }
        public HeroesContext(DbContextOptions options): base(options) { }
    }
}
