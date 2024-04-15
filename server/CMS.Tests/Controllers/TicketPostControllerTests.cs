using CMS.Api.PropertySystem.Services;
using CMS.Api.Controllers;
using CMS.Api.PropertySystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.UserSystem.Entities;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.RequestSystem.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Azure.Core;
using Azure;

namespace CMS.Tests.Controllers
{
    public class TicketPostControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<ITicketPostService> _ticketPostService;

        private readonly TicketPostController _ticketPostController;

        public TicketPostControllerTests()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            _ticketPostService = _fixture.Freeze<Mock<ITicketPostService>>();

            _ticketPostController = new TicketPostController(_ticketPostService.Object);
        }

        [Fact]
        public async Task CreateTicketPost_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            string requestTicketId = _fixture.Create<string>();
            var request = _fixture.Create<TicketPost>();
            var response = _fixture.Create<TicketPost>();


            _ticketPostService.Setup(x => x.CreateTicketPost(request, requestTicketId)).ReturnsAsync(response);

            // Act
            var result = await _ticketPostController.CreateTicketPost(request, requestTicketId).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<TicketPost>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _ticketPostService.Verify(x => x.CreateTicketPost(request, requestTicketId), Times.Once());
        }

        [Fact]
        public async Task CreateTicketPost_ShouldReturnBadRequest_WhenBadRequest()
        {
            // Arrange
            string requestTicketId = _fixture.Create<string>();
            var request = _fixture.Create<TicketPost>();
            request.CreatedBy = null;
            var response = _fixture.Create<TicketPost>();


            // Act
            var result = await _ticketPostController.CreateTicketPost(request, requestTicketId);

            // Assert
            result.Should().BeAssignableTo<ActionResult<TicketPost>>();
            result.Result.Should().BeAssignableTo<BadRequestResult>();

            _ticketPostService.Verify(x => x.CreateTicketPost(request, requestTicketId), Times.Never());
        }

        [Fact]
        public async Task ViewTicketPost_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<TicketPost>();
            var response = _fixture.Create<TicketPost>();
            string ticketPostId = _fixture.Create<string>();

            _ticketPostService.Setup(x => x.ViewTicketPost(ticketPostId)).ReturnsAsync(response);

            // Act
            var result = await _ticketPostController.ViewTicketPost(ticketPostId).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<TicketPost>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _ticketPostService.Verify(x => x.ViewTicketPost(ticketPostId), Times.Once());
        }
    }
}