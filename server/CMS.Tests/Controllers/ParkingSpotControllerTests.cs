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
using Microsoft.AspNetCore.Http.HttpResults;

namespace CMS.Tests.Controllers
{
    public class ParkingSpotControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<IParkingSpotService> _parkingSpotService;
        private readonly Mock<IApplicationUserService> _userService;

        private readonly ParkingSpotController _parkingSpotController;


        public ParkingSpotControllerTests()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            _parkingSpotService = _fixture.Freeze<Mock<IParkingSpotService>>();
            _userService = _fixture.Freeze<Mock<IApplicationUserService>>();


            _parkingSpotController = new ParkingSpotController(_parkingSpotService.Object, _userService.Object);
        }

        [Fact]
        public async Task CreateParkingSpot_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();

            string userId = _fixture.Create<string>();
            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.CreateParkingSpot(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ParkingSpot>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());
        }

        [Fact]
        public async Task CreateParkingSpot_ShouldReturnNotFound_WhenNullRequest()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();

            ParkingSpot nullParkingSpot = null;

            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.CreateParkingSpot(nullParkingSpot).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());
        }

        [Fact]
        public async Task CreateParkingSpot_ShouldReturnNotFound_WhenNullOwner()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();

            request.Owner = null;

            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.CreateParkingSpot(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();

            string userId = _fixture.Create<string>();
            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            _parkingSpotService.Setup(x => x.UpdateParkingSpot(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.UpdateParkingSpot(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ParkingSpot>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnNotFound_WhenNullRequest()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();


            string userId = _fixture.Create<string>();
            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            _parkingSpotService.Setup(x => x.UpdateParkingSpot(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.UpdateParkingSpot(null).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnNotFound_WhenInvalidOwnerId()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();


            string userId = _fixture.Create<string>();
            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            _parkingSpotService.Setup(x => x.UpdateParkingSpot(request)).ReturnsAsync(response);
            // _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.UpdateParkingSpot(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnNotFound_WhenInvalidParkingSpot()
        {
            // Arrange
            var request = _fixture.Create<ParkingSpot>();
            var response = _fixture.Create<ParkingSpot>();
            var user = _fixture.Create<ApplicationUser>();


            string userId = _fixture.Create<string>();
            _parkingSpotService.Setup(x => x.CreateParkingSpot(request)).ReturnsAsync(response);
            //_parkingSpotService.Setup(x => x.UpdateParkingSpot(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _parkingSpotController.UpdateParkingSpot(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _parkingSpotService.Verify(x => x.CreateParkingSpot(response), Times.Never());

        }


    }
}
