using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Data;
using CMS.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Windows.Networking;

namespace CMS.UserSystem;
public class ApplicationUserService
{
    private readonly CMSDbContext _context;
    private readonly PasswordHasher<ApplicationUser> _passwordHasher;
    public ApplicationUserService(CMSDbContext context)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<ApplicationUser>();
    }

    public async Task CreateUser(ApplicationUser newUser)
    {
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
    }

    public async Task CreateUser(string fName, string lName, string email, string password)
    {
        var newUser = new ApplicationUser
        {
            FirstName = fName,
            LastName = lName,
            Email = email,
        };

        newUser.PasswordHash = _passwordHasher.HashPassword(newUser, password);

        await CreateUser(newUser);
    }

    public async Task DeleteUser(ApplicationUser user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUser(ApplicationUser user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public ApplicationUser GetUserByEmail(string email)
    {
        var user =  _context.Users.FirstOrDefault(x => x.Email == email);
        if (user == null) { return null; }
        return user;
    }
}
