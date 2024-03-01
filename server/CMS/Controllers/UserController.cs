using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.UserSystem.Enum;

namespace CMS.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IApplicationUserService _userService;

        public UserController(IApplicationUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ApplicationUser>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            if (users.Value is null) return NotFound();
            return Ok(users);
        }

        [HttpGet("authenticated")]
        [Authorize]
        public async Task<ActionResult<ApplicationUser>> GetAuthenticatedUser()
        {
            // Get the user's email from the claims
            var userEmail = User.Identity.Name;

            // Modify this call to include the ProfilePicture in the fetched user data
            var userResult = await _userService.GetUserByEmailIncludingProfilePicture(userEmail);

            if (userResult.Value is null)
            {
                // Handle the case where the user is not found
                return NotFound($"User with email '{userEmail}' not found.");
            }

            return Ok(userResult);
        }

        [HttpPut("profile")]
        [Authorize]
        public async Task<ActionResult<ApplicationUser>> UpdateUserProfile([FromBody] UserProfileUpdateRequest userProfileUpdate)
        {
            var userEmail = User.Identity.Name;
            ProfilePicture profilePicture = null;

            try
            {
                // Step 1: Decode Base64 string to byte[] if image data is provided
                if (!string.IsNullOrEmpty(userProfileUpdate.ImageData))
                {
                    byte[] imageBytes = Convert.FromBase64String(userProfileUpdate.ImageData);

                    if (Enum.TryParse<ImageType>(userProfileUpdate.ImageType, true, out ImageType parsedImageType))
                    {
                        // Create and add ProfilePicture entity to the database
                        profilePicture = await _userService.UploadProfilePicture(imageBytes, parsedImageType);
                    }
                    else
                    {
                        // If the string does not match any of the ImageType enum values
                        return BadRequest("Invalid image type.");
                    }
                }

                // Step 2: Update user's profile with new data

                var updateResult = await _userService.UpdateUserProfile(userEmail, userProfileUpdate.PhoneNumber, profilePicture);

                if (!updateResult.Succeeded)
                {
                    return BadRequest(updateResult.Errors); // Ensure UpdateUserProfile returns a result object with success status and potential error messages
                }

                return Ok(updateResult.User);
            }
            catch (FormatException)
            {
                return BadRequest("Invalid image data format.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception details for debugging purposes
                // Consider using a logger to log the exception details
                Console.WriteLine(ex); // Placeholder for actual logging

                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpGet("{email}")]
        public async Task<ActionResult<ApplicationUser>> GetUserByEmail(string email)
        {
            if (!ValidateEmail(email)) return BadRequest($"Request for \"{email}\" does not follow proper email format.");

            var user = await _userService.GetUserByEmail(email);
            if (user.Value is null) return NotFound();

            return Ok(user);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUserById(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user.Value is null) return NotFound();
            return Ok(user);
        }


        [HttpPut]
        public async Task<ActionResult<ApplicationUser>> UpdateUser(ApplicationUser updatedUser)
        {
            var user = await _userService.UpdateUser(updatedUser);
            if (user is null) return NotFound();

            return Ok(user);
        }

        [HttpPost("signup")]
        public async Task<ActionResult<ApplicationUser>> SignUp([FromBody] SignUpRequest signUpRequest)
        {
            // Step 1: Call POST /register to create user and save to db
            var registerRequest = new RegisterRequest
            {
                Email = signUpRequest.Email,
                Password = signUpRequest.Password
            };

            var registrationResult = await _userService.RegisterUser(registerRequest);

            if (!registrationResult.Succeeded)
            {
                var errorDetails = registrationResult.Errors.Select(error => new
                {
                    Code = error.Code,
                    Description = error.Description
                });

                // Return detailed error information
                return BadRequest(new { Errors = errorDetails });
            }

            // Step 2: Call GET /api/users/{email} to get user data, including id
            var userEmail = signUpRequest.Email;
            var user = await _userService.GetUserByEmail(userEmail);
            if (user.Value is null) return NotFound();

            // Step 3: Call PUT /api/users to update user with first name and last name
            var updatedUser = new ApplicationUser
            {
                Id = user.Value.Id,
                FirstName = signUpRequest.FirstName,
                LastName = signUpRequest.LastName,
            };
            var updatedUserResult = await _userService.UpdateUser(updatedUser);
            if (updatedUserResult is null) return BadRequest("Failed to update user details.");

            return Ok(updatedUserResult);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public bool ValidateEmail(string email)
        {
            var emailValidation = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
            var match = Regex.Match(email, emailValidation, RegexOptions.IgnoreCase);
            return match.Success;
        }
    }

    public class SignUpRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserProfileUpdateRequest
    {
        public string? ImageData { get; set; }
        public string? ImageType { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
