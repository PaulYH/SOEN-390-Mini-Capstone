﻿using CMS.Api.Controllers;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Principal;

namespace CMS.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<IApplicationUserService> _userService;
        private readonly UserController _userController;

        public UserControllerTests()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            _userService = _fixture.Freeze<Mock<IApplicationUserService>>();


            _userController = new UserController(_userService.Object);
        }

        public Mock<UserManager<ApplicationUser>> GetMockUserManager()
        {
            var userStoreMock = new Mock<IUserStore<ApplicationUser>>();
            return new Mock<UserManager<ApplicationUser>>(
                userStoreMock.Object, null, null, null, null, null, null, null, null);
        }

        [Fact]
        public async Task GetAllUsers_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var usersMock = _fixture.Create<List<ApplicationUser>>();
            _userService.Setup(x => x.GetAllUsers()).ReturnsAsync(usersMock);

            // Act
            var result = await _userController.GetAllUsers();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<ApplicationUser>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.GetAllUsers(), Times.Once());
        }

        [Fact]
        public async Task GetAllUsers_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            List<ApplicationUser> response = null;
            _userService.Setup(x => x.GetAllUsers()).ReturnsAsync(response);

            // Act
            var result = await _userController.GetAllUsers();

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _userService.Verify(x => x.GetAllUsers(), Times.Once());
        }

        [Fact]
        public async Task GetAllUsersWaitingForKey_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var usersMock = _fixture.Create<List<ApplicationUser>>();
            var id = Guid.NewGuid();
            _userService.Setup(x => x.GetAllUsersWaitingForKey(id)).ReturnsAsync(usersMock);

            // Act
            var result = await _userController.GetAllUsersWaitingForKey(id);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<ApplicationUser>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.GetAllUsersWaitingForKey(id), Times.Once());
        }

        [Fact]
        public async Task GetAllUsersWaitingForKey_ShouldReturnOkResponse_WhenDataNotFound()
        {
            // Arrange
            List<ApplicationUser> response = null;
            var id = Guid.NewGuid();
            _userService.Setup(x => x.GetAllUsersWaitingForKey(id)).ReturnsAsync(response);

            // Act
            var result = await _userController.GetAllUsersWaitingForKey(id);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<ApplicationUser>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.GetAllUsersWaitingForKey(id), Times.Once());
        }


        [Fact]
        public async Task GetAuthenticatedUser_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var userMock = _fixture.Create<ApplicationUser>();
            userMock.UserName = "adminName";
            userMock.Email = "admin@testmail.com";
            var email = userMock.Email;

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userMock.UserName),
                new Claim(ClaimTypes.NameIdentifier, userMock.Id),
                new Claim("name", userMock.UserName),
            };
            var identity = new ClaimsIdentity(claims, "Test");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var mockPrincipal = new Mock<IPrincipal>();
            mockPrincipal.Setup(x => x.Identity).Returns(identity);
            mockPrincipal.Setup(x => x.IsInRole(It.IsAny<string>())).Returns(true);

            var mockHttpContext = new Mock<HttpContext>();
            mockHttpContext.Setup(m => m.User).Returns(claimsPrincipal);

            var context = new ControllerContext
            {
                HttpContext = mockHttpContext.Object
            };

            _userService.Setup(x => x.GetUserByEmailIncludingProfilePicture(It.IsAny<string>())).ReturnsAsync(new ActionResult<ApplicationUser>(userMock)); ;

            _userController.ControllerContext = context;

            // Act
            var result = await _userController.GetAuthenticatedUser();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ApplicationUser>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.GetUserByEmailIncludingProfilePicture(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task GetAuthenticatedUser_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            var userMock = _fixture.Create<ApplicationUser>();
            userMock.UserName = "adminName";
            userMock.Email = "admin@testmail.com";
            var email = userMock.Email;

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userMock.UserName),
                new Claim(ClaimTypes.NameIdentifier, userMock.Id),
                new Claim("name", userMock.UserName),
            };
            var identity = new ClaimsIdentity(claims, "Test");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var mockPrincipal = new Mock<IPrincipal>();
            mockPrincipal.Setup(x => x.Identity).Returns(identity);
            mockPrincipal.Setup(x => x.IsInRole(It.IsAny<string>())).Returns(true);

            var mockHttpContext = new Mock<HttpContext>();
            mockHttpContext.Setup(m => m.User).Returns(claimsPrincipal);

            var context = new ControllerContext
            {
                HttpContext = mockHttpContext.Object
            };

            _userController.ControllerContext = context;

            _userService.Setup(x => x.GetUserByEmailIncludingProfilePicture(It.IsAny<string>())).ReturnsAsync(new NotFoundResult());

            // Act
            var result = await _userController.GetAuthenticatedUser();

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundObjectResult>();
            _userService.Verify(x => x.GetUserByEmailIncludingProfilePicture(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task GetUserByEmail_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var userMock = _fixture.Create<ApplicationUser>();
            string email = "admin@testmail.com";
            _userService.Setup(x => x.GetUserByEmail(email)).ReturnsAsync(userMock);

            // Act
            var result = await _userController.GetUserByEmail(email);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ApplicationUser>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.GetUserByEmail(email), Times.Once());
        }

        [Fact]
        public async Task GetUserByEmail_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            ApplicationUser response = null;
            string email = "admin@testmail.com";
            _userService.Setup(x => x.GetUserByEmail(email)).ReturnsAsync(response);

            // Act
            var result = await _userController.GetUserByEmail(email);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _userService.Verify(x => x.GetUserByEmail(email), Times.Once());
        }

        [Fact]
        public async Task GetUserByEmail_ShouldReturnBadRequest_WhenBadInput()
        {
            // Arrange
            ApplicationUser response = null;
            string email = Guid.NewGuid().ToString();
            _userService.Setup(x => x.GetUserByEmail(email)).ReturnsAsync(response);

            // Act
            var result = await _userController.GetUserByEmail(email);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<BadRequestObjectResult>();
        }

        [Fact]
        public async Task GetUserById_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var userMock = _fixture.Create<ApplicationUser>();
            string id = Guid.NewGuid().ToString();
            _userService.Setup(x => x.GetUserById(id)).ReturnsAsync(userMock);

            // Act
            var result = await _userController.GetUserById(id);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ApplicationUser>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.GetUserById(id), Times.Once());
        }

        [Fact]
        public async Task GetUserById_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            ApplicationUser response = null;
            string id = Guid.NewGuid().ToString();
            _userService.Setup(x => x.GetUserById(id)).ReturnsAsync(response);

            // Act
            var result = await _userController.GetUserById(id);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _userService.Verify(x => x.GetUserById(id), Times.Once());
        }

        [Fact]
        public async Task UpdateUser_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var request = _fixture.Create<ApplicationUser>();
            _userService.Setup(x => x.UpdateUser(request)).ReturnsAsync(request);

            // Act
            var result = await _userController.UpdateUser(request);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ApplicationUser>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _userService.Verify(x => x.UpdateUser(request), Times.Once());
        }

        [Fact]
        public async Task UpdateUser_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            var request = _fixture.Create<ApplicationUser>();
            ApplicationUser response = null;
            _userService.Setup(x => x.UpdateUser(request)).ReturnsAsync(response);

            // Act
            var result = await _userController.UpdateUser(request);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundResult>();
            _userService.Verify(x => x.UpdateUser(request), Times.Once());
        }

        // SignUp method makes 3 service calls, need to find out how to write these tests


    }
}

