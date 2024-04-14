using CMS.Api.PropertySystem.Services;
using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Enum;
using CMS.Tests.Services.TestBases;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests.Services
{
    public class ApplicationUserServiceTests : ApplicationUserServiceTestsBase
    {
        private readonly Mock<IPropertyService> _propertyServiceMock;
        private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
        private readonly ApplicationUserService _userService;
        

        public ApplicationUserServiceTests()
        {
            _userManagerMock = new Mock<UserManager<ApplicationUser>>(
                Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);
            _propertyServiceMock = new Mock<IPropertyService>();

            _userService = new ApplicationUserService(_context, _userManagerMock.Object, _propertyServiceMock.Object);
        }

        [Fact]
        public void GetAllUsers_ShouldReturnNonEmptyUserList_WhenDataFound()
        {
            // Arrange

            // Act
            var usersResult = _userService.GetAllUsers();
            var users = usersResult.Result.Value;

            // Assert
            users.Should().NotBeNull();
        }
        [Fact]
        public void GetAllUsersWaitingForKey_ShouldReturnUserList_WhenDataFound() 
        {
            // Arrange
            var propertyId = _context.Properties.First().Id;

            // Act
            var usersResult = _userService.GetAllUsersWaitingForKey(propertyId);
            var users = usersResult.Result.Value;

            // Assert
            users.Should().NotBeNull().And.HaveCount(1);
        }

        [Fact]
        public void GetUserByEmail_ShouldReturnUser_WhenDataFound()
        {
            // Arrange
            var email = "user3@test.com";

            // Act
            var userResult = _userService.GetUserByEmail(email);
            var user = userResult.Result.Value;

            // Assert
            user.Should().NotBeNull();
            user.Email.Should().Be(email);
        }

        [Fact]
        public void GetUserById_ShouldReturnUser_WhenDataFound() 
        {
            // Arrange
            var id = _context.Users.First().Id;

            // Act
            var userResult = _userService.GetUserById(id);
            var user = userResult.Result.Value;

            // Assert
            user.Should().NotBeNull();
            user.Id.Should().Be(id);
        }

        [Fact]
        public void UpdateUser_ShouldReturnUpdatedUser_WhenUpdateSuccessful() 
        {
            // Arrange
            var property = _context.Properties.First();
            var currentUser = _context.Users.First();

            _propertyServiceMock.Setup(x => x.GetPropertyById(property.Id)).ReturnsAsync(property);

            var oldFirstName = currentUser.FirstName;
            currentUser.FirstName = "Bob";

            var oldHasRequestedOccupantKey = currentUser.hasRequestedOccupantKey;
            currentUser.hasRequestedOccupantKey = true;

            var oldProperty = currentUser.Property;
            currentUser.Property = property;

            // Act
            var updatedUserResult = _userService.UpdateUser(currentUser);
            var updatedUser = updatedUserResult.Result.Value;

            // Assert
            updatedUser.Should().NotBeNull().And.Be(currentUser);
            _propertyServiceMock.Verify(x => x.GetPropertyById(property.Id), Times.Once());
        }

        [Fact]
        public void UpdateUser_ShouldReturnNull_WhenUserNotFound() 
        {
            // Arrange
            var property = _context.Properties.First();
            var currentUser = _context.Users.First();

            _propertyServiceMock.Setup(x => x.GetPropertyById(property.Id)).ReturnsAsync(property);

            currentUser.Id = Guid.NewGuid().ToString();

            // Act
            var updatedUserResult = _userService.UpdateUser(currentUser);
            var updatedUser = updatedUserResult.Result;

            // Assert
            updatedUser.Should().BeNull();
            _propertyServiceMock.Verify(x => x.GetPropertyById(property.Id), Times.Never);
        }

        [Fact]
        public void RegisterUser_ShouldReturnSuccessfulIdentityResult_WhenUserCreated() 
        {
            // Arrange
            var newUserRequest = new RegisterRequest()
            { 
                Email = "user4@test.com",
                Password = "12Admin34?"
            };

            var newUser = new ApplicationUser()
            {
                UserName = newUserRequest.Email,
                Email = newUserRequest.Email
            };

            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), newUserRequest.Password)).ReturnsAsync(IdentityResult.Success);

            // Act
            var identityResult = _userService.RegisterUser(newUserRequest, "Public");

            // Assert
            identityResult.IsCompletedSuccessfully.Should().BeTrue();
            _userManagerMock.Verify(x => x.CreateAsync(It.IsAny<ApplicationUser>(), newUserRequest.Password), Times.Once());
        }

        [Fact]
        public void RegisterUser_ShouldReturnFailedIdentityResult_WhenUserCreationFails() 
        {
            // Arrange
            var newUserRequest = new RegisterRequest()
            {
                Email = "user4@test.com",
                Password = "12Admin34?"
            };

            var newUser = new ApplicationUser()
            {
                UserName = newUserRequest.Email,
                Email = newUserRequest.Email
            };

            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), newUserRequest.Password)).ReturnsAsync(IdentityResult.Failed(new IdentityError()));

            // Act
            var identityResult = _userService.RegisterUser(newUserRequest, "Public");

            // Assert
            identityResult.Result.Succeeded.Should().BeFalse();
            _userManagerMock.Verify(x => x.CreateAsync(It.IsAny<ApplicationUser>(), newUserRequest.Password), Times.Once());
        }

        [Fact]
        public void UpdateProfilePicture_ShouldReturnProfilePicture_WhenAddedToDatabase() 
        {
            // Arrange
            var byteArray = new byte[] { };
            var imageType = ImageType.jpg;

            // Act
            var pictureResult = _userService.UploadProfilePicture(byteArray, imageType);
            var picture = pictureResult.Result;

            // Assert
            picture.Should().NotBeNull();
            picture.ImageType.Should().Be(imageType);

        }

        [Fact]
        public void UpdateUserProfile_ShouldReturnUpdatedUser_WhenDataFound() 
        {
            // Arrange
            var email1 = "user1@test.com";
            var email2 = "user2@test.com";
            var phoneNumber = "8217238422";
            var profilePicture = new ProfilePicture();

            // Act
            var user1 = _userService.UpdateUserProfile(email1, phoneNumber, profilePicture);
            var user2 = _userService.UpdateUserProfile(email2, phoneNumber, profilePicture);

            // Assert
            user1.Result.Should().NotBeNull();
            user2.Result.Should().NotBeNull();
            user1.Result.Should().NotBe(user2.Result);
        }

        [Fact]
        public void UpdateUserProfile_ShouldReturnUserNotFound_WhenDataNotFound() 
        {
            // Arrange
            var email = "userDoesntExist@test.com";
            var phoneNumber = "8217238422";
            var profilePicture = new ProfilePicture();

            // Act
            var user = _userService.UpdateUserProfile(email, phoneNumber, profilePicture);

            // Assert
            user.Result.Should().NotBeNull();
        }

        [Fact]
        public void GetUserByEmailIncludingProfilePicture_ShouldReturnUser_WhenDataFound() 
        {
            // Arrange
            var email = "user1@test.com";
            var phoneNumber = "8217238422";
            var profilePicture = new ProfilePicture();

            // Act
            var user = _userService.UpdateUserProfile(email, phoneNumber, profilePicture);
            var userResult = user.Result;

            // Assert
            userResult.Should().NotBeNull();
            userResult.User.ProfilePicture.Should().NotBeNull();
        }
    }
}
