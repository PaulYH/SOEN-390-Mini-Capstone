using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using CMS.Api.FinancialSystem;
using CMS.Api.UserSystem.Entities;

namespace CMS.Tests.Services.TestBases
{
    public abstract class PaymentServiceTestsBase : IDisposable
    {
        private static PasswordHasher<Payment> hasher = new PasswordHasher<Payment>();
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
             .UseInMemoryDatabase(databaseName: "PaymentTests")
            .Options;
        public CMSDbContext _context;
        protected PaymentServiceTestsBase()
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
            var user =

                new ApplicationUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "User1First",
                    LastName = "User1Last",
                    Email = "user1@test.com",
                    ProfilePicture = new ProfilePicture(),
                    hasRequestedOccupantKey = false,
                    hasRequestedOwnerKey = false,
                    ParkingSpots = null,
                    Lockers = null,
                    OwnedCondoUnits = null,
                    RentedCondoUnits = null
                };
            var payment = new Payment()
            {
                Id = Guid.NewGuid(),
                TransactionDate = DateTime.Now,
                Amount = 1,
                User = user
            };
            
            _context.Payments.Add(payment);
            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }
}
