using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.UserSystem.Services
{
    public interface IApplicationUserService
    {
        Task<ActionResult<List<ApplicationUser>>> GetAllUsers();
        Task<ActionResult<ApplicationUser>> GetUserByEmail(string email);
        Task<ActionResult<ApplicationUser>> UpdateUser(ApplicationUser updatedUser);
    }
}
