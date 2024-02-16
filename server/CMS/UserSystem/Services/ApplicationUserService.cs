using CMS.Api.Data;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMS.Api.UserSystem.Services
{
    public class ApplicationUserService : IApplicationUserService
    {
        private readonly CMSDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;

        public ApplicationUserService(CMSDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
        }

        public async Task<ActionResult<List<ApplicationUser>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public async Task<ActionResult<ApplicationUser>> GetUserByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

        public async Task<ActionResult<ApplicationUser>> UpdateUser(ApplicationUser updatedUser)
        {
            var user = await _context.Users.FindAsync(updatedUser.Id);
            if (user == null)
            {
                return null;
            }

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.ParkingSpots = updatedUser.ParkingSpots;
            user.Lockers = updatedUser.Lockers;
            user.OwnedCondoUnits = updatedUser.OwnedCondoUnits;
            user.RentedCondoUnits = updatedUser.RentedCondoUnits;

            await _context.SaveChangesAsync();

            return updatedUser;
        }

        public async Task<IdentityResult> RegisterUser(RegisterRequest registerRequest)
        {
            var user = new ApplicationUser
            {
                UserName = registerRequest.Email,
                Email = registerRequest.Email,
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);
            return result;
        }
    }
}
