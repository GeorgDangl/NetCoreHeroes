using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NetCoreHeroes.Data;
using Microsoft.EntityFrameworkCore;

namespace NetCoreHeroes
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkInMemoryDatabase()
                .AddDbContext<HeroesContext>(options => options.UseInMemoryDatabase());

            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var dbContext = serviceScope.ServiceProvider.GetService<HeroesContext>())
                {
                    var heroNames = new[] {"Mr. Nice", "Narco", "Bombasto", "Celeritas", "Magneta", "RubberMan", "Dynama", "Dr IQ", "Magma", "Tornado"};
                    foreach (var heroName in heroNames)
                    {
                        dbContext.Heroes.Add(new Hero {Name = heroName});
                    }
                    dbContext.SaveChanges();
                }
            }
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute("angular2SPA", "{angularUrl?}", new { controller = "Home", action = "Index" });
            });
        }
    }
}
