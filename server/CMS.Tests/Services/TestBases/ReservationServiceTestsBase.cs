using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests.Services.TestBases
{
    public abstract class ReservationServiceTestsBase : IDisposable
    {
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "ReservationTests")
            .Options;
        public CMSDbContext _context;

        protected ReservationServiceTestsBase()
        {
            _context = new CMSDbContext(dbContextOptions);
            _context.Database.EnsureCreated();
            SeedDatabase();
        }
        public void Dispose()
        {
            _context.Database.EnsureDeleted();

        }

        private void SeedDatabase()
        {

            var rooms = new List<ReservableRoom>
            {

            };

            _context.SaveChanges();
        }
    }
}
