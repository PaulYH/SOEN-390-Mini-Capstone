using Microsoft.UI;
using CMS.Data;
using CMS.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using CMS.UserSystem.Enums;

namespace CMS
{
    public sealed partial class SignupPage : Page
    {
        private readonly CMSDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;

        public SignupPage()
        {
            this.InitializeComponent();
            _context = new CMSDbContext();
            _passwordHasher = new PasswordHasher<ApplicationUser>();
        }

        private async void Signup_Clicked(object sender, RoutedEventArgs e)
        {
            string firstName = FirstNameField.Text;
            string lastName = LastNameField.Text;
            string email = EmailField.Text;
            string password = PasswordField.Password;
            string confirmPassword = ConfirmPasswordField.Password;

            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) ||
                string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
            {
                System.Diagnostics.Debug.WriteLine("All fields are required");
                return;
            }

            if (password != confirmPassword)
            {
                System.Diagnostics.Debug.WriteLine("Password and Confirm Password do not match");
                return;
            }

            // Create a new ApplicationUser
            var user = new ApplicationUser
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
            };

            // Hash the password before storing it
            user.PasswordHash = _passwordHasher.HashPassword(user, password);

            // Create a default ProfilePicture for the new user
            var profilePicture = new Picture
            {
                ImageType = ImageType.jpeg,
                ImageData = null
            };

            // Set the ProfilePicture for the new user
            user.ProfilePicture = profilePicture;

            // Add the user to the database
            _context.PublicUsers.Add(user);
            await _context.SaveChangesAsync();
        }

        private void PasswordField_PasswordChanged(object sender, RoutedEventArgs e)
        {
            CheckPasswordMatch();
        }

        private void ConfirmPasswordField_PasswordChanged(object sender, RoutedEventArgs e)
        {
            CheckPasswordMatch();
        }

        private void CheckPasswordMatch()
        {
            var passwordMatch = PasswordField.Password == ConfirmPasswordField.Password;

            PasswordMatchText.Visibility = passwordMatch ? Visibility.Collapsed : Visibility.Visible;

            if (passwordMatch)
            {
                PasswordMatchText.Text = "Passwords match \u2713";
                PasswordMatchText.Foreground = new SolidColorBrush(Colors.Green);
            }
            else
            {
                PasswordMatchText.Text = "Passwords don't match \u274C";
                PasswordMatchText.Foreground = new SolidColorBrush(Colors.Red);
            }
        }

        private void Login_Clicked(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(LoginPage));
        }

        private void Logo_Clicked(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(MainPage));
        }
    }
}
