namespace CMS.Api
{
    public interface ISystemTime
    {
        void SetCurrentTime(DateTime dateTime);
        DateTime GetCurrentTime();
        void SetTimeSpeed(int speed);
        int GetTimeSpeed();

    }
}
