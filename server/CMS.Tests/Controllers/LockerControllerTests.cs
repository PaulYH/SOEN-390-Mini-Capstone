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
    public class LockerControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<ILockerService> _lockerService;
        private readonly Mock<IApplicationUserService> _userService;

        private readonly LockerController _lockerController;


        public LockerControllerTests()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            _lockerService = _fixture.Freeze<Mock<ILockerService>>();
            _userService = _fixture.Freeze<Mock<IApplicationUserService>>();


            _lockerController = new LockerController(_lockerService.Object, _userService.Object);
        }

        [Fact]
        public async Task CreateLocker_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();

            string userId = _fixture.Create<string>();
            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.CreateLocker(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Locker>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());
        }

        [Fact]
        public async Task CreateLocker_ShouldReturnNotFound_WhenNullRequest()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();

            Locker nullLocker = null;

            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.CreateLocker(nullLocker).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());
        }

        [Fact]
        public async Task CreateLocker_ShouldReturnNotFound_WhenNullOwner()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();

            request.Owner = null;

            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.CreateLocker(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnOkResponse_WhenValidRequest()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();

            string userId = _fixture.Create<string>();
            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            _lockerService.Setup(x => x.UpdateLocker(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.UpdateLocker(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Locker>>();
            result.Result.Should().BeAssignableTo<OkObjectResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnNotFound_WhenNullRequest()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();


            string userId = _fixture.Create<string>();
            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            _lockerService.Setup(x => x.UpdateLocker(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.UpdateLocker(null).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnNotFound_WhenInvalidOwnerId()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();


            string userId = _fixture.Create<string>();
            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            _lockerService.Setup(x => x.UpdateLocker(request)).ReturnsAsync(response);
            // _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.UpdateLocker(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnNotFound_WhenInvalidLocker()
        {
            // Arrange
            var request = _fixture.Create<Locker>();
            var response = _fixture.Create<Locker>();
            var user = _fixture.Create<ApplicationUser>();


            string userId = _fixture.Create<string>();
            _lockerService.Setup(x => x.CreateLocker(request)).ReturnsAsync(response);
            //_lockerService.Setup(x => x.UpdateLocker(request)).ReturnsAsync(response);
            _userService.Setup(x => x.GetUserById(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await _lockerController.UpdateLocker(request).ConfigureAwait(false);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _lockerService.Verify(x => x.CreateLocker(response), Times.Never());

        }


    }
}
