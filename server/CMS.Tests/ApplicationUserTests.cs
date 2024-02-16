using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests
{
    public class ApplicationUserTests
    {
        CMSDbContext _context;
        ApplicationUserService _userService;
        PasswordHasher<ApplicationUser> _passwordHasher;

        public ApplicationUserTests()
        {
            _context = new CMSDbContext(new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "ApplicationUserTests").Options);

            _context.Database.EnsureCreated();

            _userService = new ApplicationUserService(_context);
            _passwordHasher = new PasswordHasher<ApplicationUser>();

            InitialDbSeed();
        }

        private void Dispose()
        {
            _context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task GetAllUsers_Success()
        {
            var userList = await _userService.GetAllUsers();

            Assert.NotNull(userList.Value);

            Assert.True(userList.Value.Count > 1);
        }

        [Fact]
        public async Task GetUserByEmail_Success()
        {
            var userA = _context.Users.FirstOrDefault();
            string userAEmail = userA.Email;

            var userB = await _userService.GetUserByEmail(userAEmail);

            Assert.NotNull(userB.Value);
            Assert.Equal(userA.Id, userB.Value.Id);
        }

        [Fact]
        public async Task UpdateUser_Success()
        {
            var user = _context.Users.FirstOrDefault();
            string beforeEmail = user.Email;
            string afterEmail = "after@test.com";
            user.Email = afterEmail;

            await _userService.UpdateUser(user);

            var updatedUser = _context.Users.Where(x => x.Email == afterEmail).FirstOrDefault();

            Assert.True(user.Id == updatedUser.Id
                && updatedUser.Email != beforeEmail
                && updatedUser.Email == afterEmail);  
        }

        [Fact]
        public async Task UpdateUser_UserNotFound()
        {
            var fakeUser = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "Fake",
                LastName = "User",
                Email = "fake@user.com"
            };

            var result = await _userService.UpdateUser(fakeUser);
            Assert.Null(result);
        }



        private void InitialDbSeed()
        {
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

            var user2 = users[1];
            user2.PasswordHash = _passwordHasher.HashPassword(user2, "1234");
            users[1] = user2;

            var user3 = users[2];
            user3.PasswordHash = _passwordHasher.HashPassword(user3, "1234");
            users[2] = user3;
            
            _context.AddRange(users);
            _context.SaveChanges();

            var result = _context.Users.ToList();
        }
    }
}
