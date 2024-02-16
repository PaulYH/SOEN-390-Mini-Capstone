using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity.Data;

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

        [HttpGet("{email}")]
        public async Task<ActionResult<ApplicationUser>> GetUserByEmail(string email)
        {
            if (!ValidateEmail(email)) return BadRequest($"Request for \"{email}\" does not follow proper email format.");

            var user = await _userService.GetUserByEmail(email);
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
            if (!registrationResult.Succeeded) return BadRequest("Failed to register user.");

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
                // Add any other properties you need to update
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
}
