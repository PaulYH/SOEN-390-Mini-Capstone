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
    }
}
