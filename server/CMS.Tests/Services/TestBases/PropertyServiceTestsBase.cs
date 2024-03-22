using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace CMS.Tests.Services.TestBases
{
    public abstract class PropertyServiceTestsBase : IDisposable
    {
        private static PasswordHasher<Property> hasher = new PasswordHasher<Property>();
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "PropertyTests")
            .Options;
        public CMSDbContext _context;

        protected PropertyServiceTestsBase()
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
            var parkingSpot = new ParkingSpot()
            {
                Id = Guid.NewGuid(),
                ExternalSpotId = 1,
                SpotFee = 1,
                PropertyId = property.Id,
                Property = null,
                OwnerId = null,
                Owner = null,
            };
            var locker = new Locker()
            {
                Id = Guid.NewGuid(),
                ExternalLockerId = 1,
                LockerFee = 1,
                PropertyId = property.Id,
                Property = null,
                OwnerId = null,
                Owner = null,
            };
            var condoUnit = new CondoUnit()
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 1,
                RegistrationKey = Guid.NewGuid(),
                Size = 1,
                FeePerSquareFoot = 1,
                Owner = null,
                Occupant = null,
            };
            _context.Properties.Add(property);
            _context.ParkingSpots.Add(parkingSpot);
            _context.Lockers.Add(locker);
            _context.CondoUnits.Add(condoUnit);
            _context.SaveChanges();

        }
    }
}
