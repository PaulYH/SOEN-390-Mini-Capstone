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
    public abstract class TicketPostServiceTestsBase : IDisposable
    {
        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "TicketPostTests")
            .Options;
        public CMSDbContext _context;

        protected TicketPostServiceTestsBase()
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

            var post = new TicketPost()
            {
                Id = Guid.NewGuid(),
                ExternalPostId = 1,
                Description = "Description1",
                CreatedBy = createdBy,
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
            _context.TicketPosts.Add(post);
            _context.RequestTickets.Add(ticket);
            _context.SaveChanges();
        }
    }
}
