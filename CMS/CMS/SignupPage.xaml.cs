using Microsoft.UI;

namespace CMS
{
    public sealed partial class SignupPage : Page
    {
        public SignupPage()
        {
            this.InitializeComponent();
        }

        private void Signup_Clicked(object sender, RoutedEventArgs e)
        {
            string firstName = FirstNameField.Text;
            string lastName = LastNameField.Text;
            string email = EmailField.Text;
            string password = PasswordField.Password;
            string confirmPassword = ConfirmPasswordField.Password;

            // Implement your validation and signup logic here
            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) ||
                string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
            {
                // Replace this with proper UI error message handling
                System.Diagnostics.Debug.WriteLine("All fields are required");
                return;
            }

            if (password != confirmPassword)
            {
                // Replace this with proper UI error message handling
                System.Diagnostics.Debug.WriteLine("Password and Confirm Password do not match");
                return;
            }

            // call a backend service to perform the signup and pass these values to it
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
