using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace CMS.Tests.Services.TestBases
{
    public abstract class ParkingSpotServiceTestsBase : IDisposable
    {
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "ParkingSpotTests")
            .Options;
        public CMSDbContext _context;

        protected ParkingSpotServiceTestsBase()
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
            var owner = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
            };
            var property = new Property()
            {
                Id = Guid.NewGuid(),
                PropertyName = "Property1",
                CompanyName = "Company1",
                Address = "Street1",
                City = "City1",
                CondoUnits = null,
                ParkingSpots = null,
                Lockers = null,
                ReservableRooms = null
            };

            var locker = new ParkingSpot()
            {
                Id = Guid.NewGuid(),
                ExternalSpotId = 1,
                SpotFee = 1,
                PropertyId = property.Id,
                Property = property,
                OwnerId = owner.Id,
                Owner = owner
            };


            _context.Users.Add(owner);
            _context.Properties.Add(property);
            _context.ParkingSpots.Add(locker);
            _context.SaveChanges();
        }
    }
}
