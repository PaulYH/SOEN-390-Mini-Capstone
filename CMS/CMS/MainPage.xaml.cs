namespace CMS;

public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
    }

    private void BtnLogin_Click(object sender, RoutedEventArgs e)
    {
        this.Frame.Navigate(typeof(LoginPage));
    }

    private void BtnSignup_Click(object sender, RoutedEventArgs e)
    {
        this.Frame.Navigate(typeof(SignupPage));
    }
}
