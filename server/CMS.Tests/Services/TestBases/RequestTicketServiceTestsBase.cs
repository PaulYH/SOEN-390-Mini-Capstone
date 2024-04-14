using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace CMS.Tests.Services.TestBases
{
    public abstract class RequestTicketServiceTestsBase : IDisposable
    {
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "RequestTicketTests")
            .Options;
        public CMSDbContext _context;

        protected RequestTicketServiceTestsBase()
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

            var createdBy = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
            };

            var ticket = new RequestTicket()
            {
                Id = Guid.NewGuid(),
                ExternalTicketId = 1,
                Title = "Title1",
                Description = "Description1",
                Category = CategoryType.Question,
                CreatedBy = createdBy,
            };


            _context.Users.Add(createdBy);
            _context.RequestTickets.Add(ticket);
            _context.SaveChanges();
        }
    }
}
