using System.ComponentModel;

namespace CMS
{
    public sealed partial class Profilepage : Page, INotifyPropertyChanged
    {
        public Profilepage()
        {
            this.InitializeComponent();
            DataContext = this;

            // Set the default value for PhoneNumber and ensure "(optional)" is displayed initially
            PhoneNumber = "(optional)";
        }

        public event PropertyChangedEventHandler PropertyChanged;

        private void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        private void Logo_Clicked(object sender, RoutedEventArgs e)
        {
            Frame.Navigate(typeof(MainPage));
        }
        private void Rental_Clicked(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(MainPage));
        }
        private void Owner_Clicked(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(MainPage));
        }
        public string Name { get; set; } = "First Last";
        public string Email { get; set; } = "email@email.com";

        public string PhoneNumber
        {
            get { return _phoneNumber; }
            set
            {
                _phoneNumber = value;
                OnPropertyChanged(nameof(PhoneNumber));
            }
        }

        private string _phoneNumber = "(optional)";

        private void PhoneNumberField_GotFocus(object sender, RoutedEventArgs e)
        {
            if (PhoneNumber == "(optional)")
            {
                PhoneNumber = string.Empty;
            }
        }

        private void PhoneNumberField_LostFocus(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(PhoneNumber))
            {
                PhoneNumber = "(optional)";
            }
        }
        private void SignOut_Clicked(object sender, RoutedEventArgs e)
        {
            // goes back to previous page
            if (Frame.CanGoBack)
            {
                Frame.GoBack();
            }
            else
            {
                // If there is no page to go back to, you can choose to exit the application
                Windows.ApplicationModel.Core.CoreApplication.Exit();
            }
        }
        private void Save_Clicked(object sender, RoutedEventArgs e)
        {
            // Saves the new details .... no logic implemented yet

            // Display a temporary message below the button
            ShowTemporaryMessage("Data Saved!", 1000); // 1000 milliseconds (1 seconds)

        }
        private void ShowTemporaryMessage(string message, int durationMilliseconds)
        {
            TextBlock messageTextBlock = new TextBlock();
            messageTextBlock.Text = message;
            messageTextBlock.HorizontalAlignment = HorizontalAlignment.Center;
            messageTextBlock.VerticalAlignment = VerticalAlignment.Top;
            messageTextBlock.Margin = new Thickness(0, 30, 0, 0); // Adjust the margin as needed

            // Add the TextBlock to the parent container of the button
            StackPanel stackPanel = (StackPanel)SaveButton.Parent; // Assuming SaveButton is the name of your button
            stackPanel.Children.Add(messageTextBlock);

            // Use a DispatcherTimer to remove the TextBlock after a specified duration
            DispatcherTimer timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromMilliseconds(durationMilliseconds);
            timer.Tick += (s, args) =>
            {
                stackPanel.Children.Remove(messageTextBlock);
                timer.Stop();
            };
            timer.Start();
        }
    }
}
