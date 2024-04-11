using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using CMS.Api.UserSystem.Enum;

namespace CMS.Api.UserSystem.Services
{
    public interface IApplicationUserService
    {
        Task<ActionResult<List<ApplicationUser>>> GetAllUsers();
        Task<ActionResult<ApplicationUser>> GetUserByEmail(string email);
        Task<ActionResult<ApplicationUser>> GetUserById(string id);
        Task<ActionResult<ApplicationUser>> UpdateUser(ApplicationUser updatedUser);
        Task<IdentityResult> RegisterUser(RegisterRequest registerRequest, string type);
        Task<ProfilePicture> UploadProfilePicture(byte[] imageData, ImageType imageType);
        Task<(bool Succeeded, IEnumerable<string> Errors, ApplicationUser User)> UpdateUserProfile(string email, string phoneNumber, ProfilePicture profilePicture);
        Task<ActionResult<ApplicationUser>> GetUserByEmailIncludingProfilePicture(string email);
        Task<ActionResult<List<ApplicationUser>>> GetAllUsersWaitingForKey(Guid propertyId);
    }
}
