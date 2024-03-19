using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CMS.Tests.Services
{
    public abstract class ServiceTestsBase : IDisposable
    {
        private static PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();

        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
           .UseInMemoryDatabase(databaseName: "UserTests")
           .Options;

        public CMSDbContext _context;

        protected ServiceTestsBase()
        {
            // Do "global" initialization here; Called before every test method.

            _context = new CMSDbContext(dbContextOptions);
            _context.Database.EnsureCreated();
            SeedDatabase();
        }

        public void Dispose()
        {
            // Do "global" teardown here; Called after every test method.

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

            var users = new List<ApplicationUser>
            {
                new ApplicationUser()
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
                },
                new ApplicationUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "User2First",
                    LastName = "User2Last",
                    Email = "user1@test.com",
                    ProfilePicture = null,
                    Property = property,
                    hasRequestedOccupantKey = false,
                    hasRequestedOwnerKey = false,
                    ParkingSpots = null,
                    Lockers = null,
                    OwnedCondoUnits = null,
                    RentedCondoUnits = null
                },
                new ApplicationUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "User3First",
                    LastName = "User3Last",
                    Email = "user1@test.com",
                    ProfilePicture = null,
                    Property = property,
                    hasRequestedOccupantKey = false,
                    hasRequestedOwnerKey = false,
                    ParkingSpots = null,
                    Lockers = null,
                    OwnedCondoUnits = null,
                    RentedCondoUnits = null
                }
            };

            foreach (ApplicationUser user in users)
            {
                user.PasswordHash = hasher.HashPassword(user, "12Admin34?");
            }

            _context.Users.AddRange(users);

            _context.SaveChanges();
        }
    }
}
