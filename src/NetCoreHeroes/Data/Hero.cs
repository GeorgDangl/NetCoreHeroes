using Newtonsoft.Json;

namespace NetCoreHeroes.Data
{
    public class Hero
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class HeroPost
    {
        public string Name { get; set; }
    }
}