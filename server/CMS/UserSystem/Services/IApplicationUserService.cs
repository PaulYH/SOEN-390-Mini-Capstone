using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMS.Api.UserSystem.Services
{
    public interface IApplicationUserService
    {
        Task<ActionResult<List<ApplicationUser>>> GetAllUsers();
        Task<ActionResult<ApplicationUser>> GetUserByEmail(string email);
        Task<ActionResult<ApplicationUser>> UpdateUser(ApplicationUser updatedUser);
        Task<IdentityResult> RegisterUser(RegisterRequest registerRequest);
    }
}
