using Microsoft.UI;
using CMS.Data;
using CMS.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;

namespace CMS
{
    public sealed partial class LoginPage : Page
    {
        private readonly CMSDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;

        public LoginPage()
        {
            this.InitializeComponent();
            _context = new CMSDbContext();
            _passwordHasher = new PasswordHasher<ApplicationUser>();
        }

        private async void Login_Clicked(object sender, RoutedEventArgs e)
        {
            string email = EmailField.Text;
            string password = PasswordField.Password;

            // Find the user by email
            var user = await _context.PublicUsers.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                System.Diagnostics.Debug.WriteLine("User not found");
                return;
            }

            // Verify the password
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);

            if (result == PasswordVerificationResult.Failed)
            {
                System.Diagnostics.Debug.WriteLine("Invalid password");
                return;
            }

        }

        private void Signup_Clicked(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(SignupPage));
        }

        private void Logo_Clicked(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(MainPage));
        }
    }
}
