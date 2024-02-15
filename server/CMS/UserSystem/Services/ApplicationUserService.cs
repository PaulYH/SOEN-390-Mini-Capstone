using CMS.Api.Data;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Api.UserSystem.Services
{
    public class ApplicationUserService : IApplicationUserService
    {
        private readonly CMSDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;
        public ApplicationUserService(CMSDbContext context)
        {
            _context = context;
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
    }
}
