using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Data;
using CMS.UserSystem;
using CMS.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Uno.Extensions.Specialized;

namespace CMS.Tests;
public class UserServiceTests : IDisposable
{
    private static DbContextOptions<CMSDbContext> options = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "UserServiceTests").Options;

    CMSDbContext _context;
    ApplicationUserService _userService;
    PasswordHasher<ApplicationUser> _passwordHasher;

    [SetUp]
    public void SetUp()
    {
        _context = new CMSDbContext(options);
        _context.Database.EnsureCreated();
        _userService = new ApplicationUserService(_context);
        _passwordHasher = new PasswordHasher<ApplicationUser>();

        var users = new List<ApplicationUser>()
        {
            new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Bob",
                LastName = "Roberts",
                Email = "bob@gmail.com"
            },
            new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "John",
                LastName = "Doe",
                Email = "john@gmail.com"
            },
            new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "George",
                LastName = "Smith",
                Email = "george@gmail.com"
            }
        };
        var user1 = users[0];
        user1.PasswordHash = _passwordHasher.HashPassword(user1, "1234");
        users[0] = user1;

        var user2 = users[0];
        user2.PasswordHash = _passwordHasher.HashPassword(user2, "1234");
        users[1] = user2;

        var user3 = users[0];
        user3.PasswordHash = _passwordHasher.HashPassword(user3, "1234");
        users[2] = user3;
        _context.Users.AddRange(users);

        _context.SaveChanges();
    }

    [Test]
    public async Task CreateUser_Success()
    {
        var totalBefore = _context.Users.Count();

        var newUser = new ApplicationUser()
        {
            Id = Guid.NewGuid().ToString(),
            FirstName = "Bill",
            LastName = "Johnson",
            Email = "bill@gmail.com"
        };
        newUser.PasswordHash = _passwordHasher.HashPassword(newUser, "password");

        await _userService.CreateUser(newUser);

        var totalAfter = _context.Users.Count();

        if (totalAfter == totalBefore + 1) 
            Assert.Pass();
        
        Assert.Fail();
    }

    [Test]
    public async Task DeleteUser_Success()
    {
        var totalBefore = _context.Users.Count();

        var deleteUser = _context.Users.FirstOrDefault();

        await _userService.DeleteUser(deleteUser);
        var totalAfter = _context.Users.Count();

        if (totalAfter == totalBefore - 1)
            Assert.Pass();

        Assert.Fail();
    }
    [Test]
    public async Task UpdateUser_Success()
    {
        var user = _context.Users.FirstOrDefault();
        string beforeEmail = user.Email;
        string afterEmail = "after@test.com";
        user.Email = afterEmail;

        await _userService.UpdateUser(user);

        var updatedUser = _context.Users.Where(x => x.Email == afterEmail).FirstOrDefault();

        if (user.Id == updatedUser.Id
            && updatedUser.Email != beforeEmail 
            && updatedUser.Email == afterEmail)
            Assert.Pass();
        Assert.Fail();
    }

    [Test]
    public async Task GetUserByEmail_Success()
    {
        var userA = _context.Users.FirstOrDefault();
        string userAEmail = userA.Email;

        var userB = _userService.GetUserByEmail(userAEmail);

        if (userA.Id.Equals(userB.Id))
            Assert.Pass();
        Assert.Fail();
    }

    [TearDown]
    public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }
}
