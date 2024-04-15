using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests.Services.TestBases
{
    public abstract class ReservableRoomServiceTestsBase : IDisposable
    {
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "ReservableRoomTests")
            .Options;
        public CMSDbContext _context;

        protected ReservableRoomServiceTestsBase()
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


            _context.SaveChanges();
        }
    }
}
