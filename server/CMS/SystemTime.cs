using CMS.Api.Data;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Timers;
namespace CMS.Api

{
    public class SystemTime : ISystemTime
    {
        public DateTime CurrentTime = DateTime.Now;
        private System.Timers.Timer timer;
        private int timerInterval = 1000;
        public int TimeSpeed = 1;
        bool hasRun = false;
        private readonly IServiceScopeFactory _scopeFactory;

        public SystemTime(IServiceScopeFactory scopeFactory) 
        {
            _scopeFactory = scopeFactory;

            timer = new System.Timers.Timer(timerInterval);
            timer.Enabled = true;
            timer.AutoReset = true;
            timer.Elapsed += (sender, e) => UpdateTime();
        }
       
        // timer logic here 
        private void UpdateTime()
        {
            Console.WriteLine("UpdateTime called: " + CurrentTime.ToString());
            timer.Interval = timerInterval / TimeSpeed;
            CurrentTime = CurrentTime.AddSeconds(1);
            // so you can call it only one a month @ 2:00am
            TimeSpan time = new TimeSpan(2, 0, 0);
            // if the first of the month update balance
            if (CurrentTime.Day == 1 && CurrentTime.TimeOfDay == time)
            {
                UpdateBalance();
            }
        }
        private async void UpdateBalance()
        {
            hasRun = true;
            using(var scope = _scopeFactory.CreateScope())
            {
                var _context = scope.ServiceProvider.GetRequiredService<CMSDbContext>();
                var _userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

                // Update balance would go over every user add up fees.  
                var users = _context.Users
                    .Include(x => x.OwnedCondoUnits)
                    .Include(x => x.RentedCondoUnits)
                    .Include(x => x.ParkingSpots)
                    .Include(x => x.Lockers)
                    .ToList();

                foreach (var user in users)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    if (roles == null || roles.Count == 0)
                        continue;

                    var role = roles[0];
                    if (role == "Public" || role == "Employee")
                        continue;

                    var condoUnit = (role == "Owner") ? user.OwnedCondoUnits.First() : user.RentedCondoUnits.First();
                    var condoFee = condoUnit.FeePerSquareFoot * condoUnit.Size;

                    var parkingSpots = user.ParkingSpots;
                    var parkingFee = (parkingSpots == null || parkingSpots.Count == 0) ? 0 : parkingSpots.First().SpotFee;

                    var lockers = user.Lockers;
                    var lockerFee = (lockers == null || lockers.Count == 0) ? 0 : lockers.First().LockerFee;

                    var monthlyFee = decimal.ToDouble(condoFee + parkingFee + lockerFee);

                    user.Balance += monthlyFee;
                }

                _context.SaveChanges();
            }
        }

        public void SetCurrentTime(DateTime dateTime)
        {
            CurrentTime = dateTime;
        }
        public DateTime GetCurrentTime()
        {
            return CurrentTime;
        }
        public void SetTimeSpeed(int speed)
        {
            TimeSpeed = speed;
        }
        public int GetTimeSpeed()
        {
            return TimeSpeed;
        }
        
    }


}

