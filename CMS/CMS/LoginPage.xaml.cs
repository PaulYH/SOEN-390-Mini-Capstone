using Microsoft.UI;
using CMS.Data;
using CMS.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using Windows.UI;
using Windows.Networking.NetworkOperators;

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
                // Replace this with proper UI error message handling
                System.Diagnostics.Debug.WriteLine("User not found");
                return;
            }

            // Verify the password
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);

            if (result == PasswordVerificationResult.Failed)
            {
                // Remove the previous error message if it exists
                var existingErrorTextBlock = LoginStackPanel.Children.OfType<TextBlock>().FirstOrDefault(tb => tb.Name == "ErrorTextBlock");
                if (existingErrorTextBlock != null)
                {
                    LoginStackPanel.Children.Remove(existingErrorTextBlock);
                }

                // Display error message
                var errorTextBlock = new TextBlock
                {
                    Name = "ErrorTextBlock",
                    Text = "Password incorrect",
                    Foreground = new SolidColorBrush(Colors.Red),
                    Margin = new Thickness(0, 10, 0, 0)
                };
                LoginStackPanel.Children.Add(errorTextBlock);
                return;
            }

            this.Frame.Navigate(typeof(Profilepage));
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
