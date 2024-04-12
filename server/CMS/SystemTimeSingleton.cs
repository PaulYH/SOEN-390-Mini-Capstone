using CMS.Api.Data;
using System.Timers;
namespace CMS.Api

{
    public class SystemTimeSingleton
    {
        private static SystemTimeSingleton? instance ;
        public DateTime CurrentTime =DateTime.Now;
        private System.Timers.Timer timer;
        private int timerInterval = 1000;
        public int TimeSpeed = 1;
        private readonly CMSDbContext _context;
        private SystemTimeSingleton() {} 
       
        public static SystemTimeSingleton GetInstance()
        {
                if (instance == null)
                {
                    instance = new SystemTimeSingleton();
                    instance.CreateTimer();
                }
                return instance;
        
        }
        private void CreateTimer()
        {
            timer = new System.Timers.Timer(timerInterval);
            timer.Enabled = true;
            timer.AutoReset = true;
            timer.Elapsed += (sender, e) => UpdateTime();
        }
        // timer logic here 
        private void UpdateTime()
        {
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
        public void UpdateBalance()
        {
            // Update balance would go over every user add up fees.  
        }
    }


}
