using CMS.Api.RequestSystem.Services;
using CMS.Api.RequestSystem.Entities;

using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using CMS.Tests.Services.TestBases;
using CMS.Api.PropertySystem.Entities;
namespace CMS.Tests.Services
{
    public class TicketPostServiceTests : TicketPostServiceTestsBase
    {
        private readonly ITicketPostService _requestTicketService;

        public TicketPostServiceTests()
        {
            _requestTicketService = new TicketPostService(_context);
        }

        [Fact]
        public async Task GetAll_ShouldReturnTicketPostList_WhenValidRequest()
        {
            // Arrange

            var result = await _requestTicketService.GetAll();

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<IEnumerable<TicketPost>>>();
        }

        [Fact]
        public async Task CreateTicketPost_ShouldReturnTicketPost_WhenValidRequest()
        {
            // Arrange
            var post = new TicketPost()
            {
                CreatedBy = _context.Users.First()
            };
            var requestTicketId = _context.RequestTickets.First().Id.ToString();

            var result = await _requestTicketService.CreateTicketPost(post, requestTicketId);

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<TicketPost>>();
        }


        [Fact]
        public async Task CreateTicketPost_ShouldReturnNull_WhenInvalidCreator()
        {
            // Arrange
            var post = new TicketPost()
            {
                CreatedBy = new ApplicationUser(),
            };
            var requestTicketId = _context.RequestTickets.First().Id.ToString();

            var result = await _requestTicketService.CreateTicketPost(post, requestTicketId);

            result.Should().BeNull();
        }

        [Fact]
        public async Task ViewTicketPost_ShouldReturnTicketPost_WhenValidRequest()
        {

            // Arrange
            var post = new TicketPost()
            {
                Id = _context.TicketPosts.First().Id,
            };

            var result = await _requestTicketService.ViewTicketPost(post.Id.ToString());

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<TicketPost>>();
        }

        [Fact]
        public async Task ViewTicketPost_ShouldReturnNull_WhenInvalidId()
        {

            // Arrange
            var post = new TicketPost()
            {
                Id = Guid.NewGuid(),
            };

            var result = await _requestTicketService.ViewTicketPost(post.Id.ToString());

            result.Should().BeNull();
        }
    }
}