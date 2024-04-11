
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace CMS.Tests.Services
{
    public abstract class CondoUnitServiceTestBase : IDisposable
    {
        private static PasswordHasher<Property> hasher = new PasswordHasher<Property>();
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "PropertyTests")
            .Options;
        public CMSDbContext _context;

        protected CondoUnitServiceTestBase()
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

            _context.Properties.Add(property);

            var user = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "User1First",
                LastName = "User1Last",
                Email = "user1@test.com",
                ProfilePicture = null,
                Property = property,
                hasRequestedOccupantKey = false,
                hasRequestedOwnerKey = false,
                ParkingSpots = null,
                Lockers = null,
                OwnedCondoUnits = null,
                RentedCondoUnits = null
            };

            var owner = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "User1First",
                LastName = "User1Last",
                Email = "user1@test.com",
                ProfilePicture = null,
                Property = property,
                hasRequestedOccupantKey = false,
                hasRequestedOwnerKey = false,
                ParkingSpots = null,
                Lockers = null,
                OwnedCondoUnits = null
            };

            var occupant = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "User1First",
                LastName = "User1Last",
                Email = "user1@test.com",
                ProfilePicture = null,
                Property = property,
                hasRequestedOwnerKey = false,
                ParkingSpots = null,
                Lockers = null
            };

            var condoUnit = new CondoUnit()
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 1,
                RegistrationKey = Guid.NewGuid(),
                Size = 1,
                FeePerSquareFoot = 1,
                Owner = user,
                Occupant = occupant
            };

            _context.CondoUnits.Add(condoUnit);

            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }
}
