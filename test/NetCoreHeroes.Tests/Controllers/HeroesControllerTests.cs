using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NetCoreHeroes.Controllers;
using NetCoreHeroes.Data;
using Xunit;

namespace NetCoreHeroes.Tests.Controllers
{
    public class HeroesControllerTests
    {
        public class Get : IDisposable
        {
            private readonly HeroesContext _context;

            private readonly HeroesController _controller;

            public Get()
            {
                var services = new ServiceCollection();
                services.AddEntityFrameworkInMemoryDatabase()
                    .AddDbContext<HeroesContext>(x => x.UseInMemoryDatabase().UseInternalServiceProvider(new ServiceCollection().AddEntityFrameworkInMemoryDatabase().BuildServiceProvider())); // Don't share context data -> use new InternalServiceProvider per instance
                _context = services.BuildServiceProvider().GetRequiredService<HeroesContext>();
                _controller = new HeroesController(_context);
            }

            public void Dispose()
            {
                _context?.Dispose();
            }

            [Fact]
            public void ReturnResults()
            {
                // Arrange -> Fill context
                _context.Heroes.Add(new Hero {Name = "Good Guy Greg"});
                _context.Heroes.Add(new Hero {Name = "Bad Luck Brian"});
                _context.Heroes.Add(new Hero {Name = "Doge"});
                _context.SaveChanges();

                // Act
                var response = _controller.Get();

                // Assert
                var objectResult = response as ObjectResult;
                Assert.NotNull(objectResult);
                var heroesList = (objectResult.Value as IEnumerable<Hero>)?.ToList();
                Assert.NotNull(heroesList);
                Assert.Equal("Good Guy Greg", heroesList[0].Name);
                Assert.Equal("Bad Luck Brian", heroesList[1].Name);
                Assert.Equal("Doge", heroesList[2].Name);
            }
        }
    }
}
