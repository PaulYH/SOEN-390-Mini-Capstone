using System;
using System.ComponentModel;
using Microsoft.Win32;
using System.IO;
using System.Windows;
using Microsoft.UI.Xaml.Media.Imaging;
using Windows.Networking.NetworkOperators;
using Windows.Storage.Pickers;
using System.Runtime.InteropServices;

namespace CMS
{
    public sealed partial class Profilepage : Page, INotifyPropertyChanged
    {
        private string selectedImagePath;

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
        public class PlatformChecker
        {
            public static bool IsWindows()
            {
                return RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
            }
        }

        private async void SelectProfilePicture_Click(object sender, RoutedEventArgs e)
        {
            if (!PlatformChecker.IsWindows()) { 

                FileOpenPicker fileOpenPicker = new FileOpenPicker
                {
                    ViewMode = PickerViewMode.Thumbnail,
                    SuggestedStartLocation = PickerLocationId.PicturesLibrary
                };

            fileOpenPicker.FileTypeFilter.Add(".png");
            fileOpenPicker.FileTypeFilter.Add(".jpg");
            fileOpenPicker.FileTypeFilter.Add(".jpeg");

            StorageFile file = await fileOpenPicker.PickSingleFileAsync();

            if (file != null)
            {
                using (var stream = await file.OpenAsync(FileAccessMode.Read))
                {
                    // Create a BitmapImage from the stream
                    BitmapImage bitmap = new BitmapImage();
                    await bitmap.SetSourceAsync(stream);

                    // Display the selected image
                    profileImage.Source = bitmap;
                }
            }
            }
            else
            {
                return;
            }
        }

        private void Save_Clicked(object sender, RoutedEventArgs e)
        {
            // Add logic to save the new details including the selected profile picture

            // Display a temporary message below the button
            ShowTemporaryMessage("Data Saved!", 1000); // 1000 milliseconds (1 second)
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

        private void SignOut_Clicked(object sender, RoutedEventArgs e)
        {
            // goes back to the previous page
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
    }
}
