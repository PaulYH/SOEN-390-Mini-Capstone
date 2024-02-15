﻿using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

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
            return Ok(users);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<List<ApplicationUser>>> GetUserByEmail(string email)
        {
            var emailValidation = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
            var match = Regex.Match(email, emailValidation, RegexOptions.IgnoreCase);
            if (!match.Success) return BadRequest($"Request for \"{email}\" does not follow proper email format.");

            var user = await _userService.GetUserByEmail(email);
            if (user.Value is null) return NotFound();

            return Ok(user);
        }
    }
}
