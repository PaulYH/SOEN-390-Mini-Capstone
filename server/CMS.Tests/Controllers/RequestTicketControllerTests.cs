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
    public class RequestTicketControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<IRequestTicketService> _requestTicketService;

        private readonly RequestTicketController _requestTicketController;

        public RequestTicketControllerTests()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            _requestTicketService = _fixture.Freeze<Mock<IRequestTicketService>>();

            _requestTicketController = new RequestTicketController(_requestTicketService.Object);
        }

        [Fact]
        public async Task CreateRequestTicket_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<RequestTicket>();
            var response = _fixture.Create<RequestTicket>();

            _requestTicketService.Setup(x => x.CreateRequestTicket(request)).ReturnsAsync(response);

            // Act
            var result = await _requestTicketController.CreateRequestTicket(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Locker>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _requestTicketService.Verify(x => x.CreateRequestTicket(response), Times.Never());
        }
        [Fact]
        public async Task CreateRequestTicket_ShouldReturnBadRequest_WhenBadRequest()
        {
            // Arrange
            var request = _fixture.Create<RequestTicket>();
            request.CreatedBy = null;
            var response = _fixture.Create<RequestTicket>();

            // Act
            var result = await _requestTicketController.CreateRequestTicket(null);

            // Assert
            result.Should().BeNull();
            _requestTicketService.Verify(x => x.CreateRequestTicket(response), Times.Never());
        }

        [Fact]
        public async Task UpdateRequestTicket_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<RequestTicket>();
            var response = _fixture.Create<RequestTicket>();

            _requestTicketService.Setup(x => x.CreateRequestTicket(request)).ReturnsAsync(response);

            // Act
            var result = await _requestTicketController.UpdateRequestTicket(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Locker>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _requestTicketService.Verify(x => x.CreateRequestTicket(response), Times.Never());
        }

        [Fact]
        public async Task GetAll_ShouldReturnOkResponse()
        {
            var response = _fixture.Create<List<RequestTicket>>();
            _requestTicketService.Setup(x => x.GetAll()).ReturnsAsync(response);

            var result = await _requestTicketController.GetAll();

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Locker>>();

            _requestTicketService.Verify(x => x.GetAll(), Times.Never());
        }


        [Fact]
        public async Task GetTicketWithPosts_ShouldReturnOkResponse()
        {
            var response = _fixture.Create<RequestTicket>();
            var id = _fixture.Create<string>();
            _requestTicketService.Setup(x => x.GetRequestTicketWithPosts(id)).ReturnsAsync(response);

            var result = await _requestTicketController.GetTicketWithPosts(id);

            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<RequestTicket>>();

            _requestTicketService.Verify(x => x.GetAll(), Times.Never());
        }
    }
}