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
    public class RequestTicketServiceTests : RequestTicketServiceTestsBase
    {
        private readonly IRequestTicketService _requestTicketService;

        public RequestTicketServiceTests()
        {
            _requestTicketService = new RequestTicketService(_context);
        }

        [Fact]
        public async Task GetAll_ShouldReturnRequestTicketList_WhenValidRequest()
        {
            // Arrange

            var result = await _requestTicketService.GetAll();

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<IEnumerable<RequestTicket>>>();
        }

        [Fact]
        public async Task CreateRequestTicket_ShouldReturnRequestTicket_WhenValidRequest()
        {

            // Arrange
            var ticket = new RequestTicket()
            {
                IsMuted = false,
                Title = "sfjklsdf",
                Description = "djksjkjko",
                Category = Api.RequestSystem.Enums.CategoryType.Repair,
                CreatedBy = _context.Users.First()
            };

            var result = await _requestTicketService.CreateRequestTicket(ticket);

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RequestTicket>>();
        }


        [Fact]
        public async Task CreateRequestTicket_ShouldReturnNull_WhenInvalidCreator()
        {

            // Arrange
            var ticket = new RequestTicket()
            {
                IsMuted = false,
                Title = "sfjklsdf",
                Description = "djksjkjko",
                Category = Api.RequestSystem.Enums.CategoryType.Repair,
                CreatedBy = new ApplicationUser(),
            };

            var result = await _requestTicketService.CreateRequestTicket(ticket);

            result.Should().BeNull();
        }

        [Fact]
        public async Task UpdateRequestTicket_ShouldReturnRequestTicket_WhenValidRequest()
        {

            // Arrange
            var ticket = new RequestTicket()
            {
                Id = _context.RequestTickets.First().Id,
                Title = "sfsdf",
                Description = "aaadjksjkssjko",
                Category = Api.RequestSystem.Enums.CategoryType.Repair,
                Status = Api.RequestSystem.Enums.StatusType.Resolved,
            };

            var result = await _requestTicketService.UpdateRequestTicket(ticket);

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RequestTicket>>();
        }

        [Fact]
        public async Task UpdateRequestTicket_ShouldReturnRequestTicket_WhenInvalidId()
        {

            // Arrange
            var ticket = new RequestTicket()
            {
                Id = new Guid(),
                Title = "sfsdf",
                Description = "aaadjksjkssjko",
                Category = Api.RequestSystem.Enums.CategoryType.Repair,
                Status = Api.RequestSystem.Enums.StatusType.Resolved,
            };

            var result = await _requestTicketService.UpdateRequestTicket(ticket);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetRequestTicketsWithPosts_ShouldReturnRequestTicket_WhenValidRequest()
        {

            // Arrange
            var id = _context.RequestTickets.First().Id.ToString();

            var result = await _requestTicketService.GetRequestTicketWithPosts(id);

            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<RequestTicket>>();
        }

        [Fact]
        public async Task GetRequestTicketsWithPosts_ShouldReturnNull_WhenInvalidId()
        {

            // Arrange
            var id = _context.RequestTickets.First().Id.ToString();

            var result = await _requestTicketService.GetRequestTicketWithPosts(new Guid().ToString());

            result.Should().BeNull();
        }


    }
}