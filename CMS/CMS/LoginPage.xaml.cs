using Microsoft.UI;

namespace CMS
{
    public sealed partial class LoginPage : Page
    {
        public LoginPage()
        {
            this.InitializeComponent();
        }

        private void Login_Clicked(object sender, RoutedEventArgs e)
        {
            string email = EmailField.Text;
            string password = PasswordField.Password;


            // call backend service to perform the signup and pass these values to it
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
