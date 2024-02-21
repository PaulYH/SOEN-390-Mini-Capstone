﻿using CMS.Api.Data;
using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

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
                // Set other properties as needed
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);

            if (!result.Succeeded)
            {
                // Convert errors to IdentityError objects
                var errors = result.Errors.Select(error => new IdentityError
                {
                    Code = error.Code,
                    Description = error.Description
                });

                return IdentityResult.Failed(errors.ToArray());
            }

            return result;
        }

        public async Task<ProfilePicture> UploadProfilePicture(byte[] imageData, ImageType imageType)
        {
            // Create a new ProfilePicture entity
            var profilePicture = new ProfilePicture
            {
                ImageType = imageType,
                ImageData = imageData
            };

            // Add the ProfilePicture entity to the database
            _context.ProfilePictures.Add(profilePicture);
            await _context.SaveChangesAsync();

            return profilePicture;
        }

        public async Task<(bool Succeeded, IEnumerable<string> Errors, ApplicationUser User)> UpdateUserProfile(string email, string phoneNumber, ProfilePicture profilePicture)
        {
            try
            {
                var user = await _context.Users
                                          .Include(u => u.ProfilePicture)
                                          .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return (false, new[] { "User not found." }, null);
                }

                // Update phone number if provided
                if (!string.IsNullOrEmpty(phoneNumber))
                {
                    user.PhoneNumber = phoneNumber;
                }

                // Handle profile picture update
                if (profilePicture != null)
                {
                    if (user.ProfilePicture != null)
                    {
                        // If user already has a profile picture, update it
                        user.ProfilePicture.ImageData = profilePicture.ImageData;
                        user.ProfilePicture.ImageType = profilePicture.ImageType;
                    }
                    else
                    {
                        // If no existing profile picture, add a new one
                        user.ProfilePicture = new ProfilePicture
                        {
                            ImageData = profilePicture.ImageData,
                            ImageType = profilePicture.ImageType
                        };
                        _context.ProfilePictures.Add(user.ProfilePicture);
                    }
                }

                await _context.SaveChangesAsync();
                return (true, Array.Empty<string>(), user);
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return (false, new[] { $"An error occurred: {ex.Message}" }, null);
            }
        }

        public async Task<ActionResult<ApplicationUser>> GetUserByEmailIncludingProfilePicture(string email)
        {
            var user = await _context.Users
                                     .Include(u => u.ProfilePicture)
                                     .FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

    }
}