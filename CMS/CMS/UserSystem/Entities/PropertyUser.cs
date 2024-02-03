using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.PropertySystem.Entities;

namespace CMS.UserSystem.Entities;
public class PropertyUser : ApplicationUser
{
    public string PropertyName { get; set; }
    public string CompanyName { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public List<ParkingSpot> ParkingSpots { get; set; } = new List<ParkingSpot>();
    public List<Locker> Lockers { get; set; } = new List<Locker>();
    public List<ReservableRoom> ReservableRooms { get; set; } = new List<ReservableRoom>();

    public PropertyUser(string fName, string lName, string email, string password, string phoneNumber, string propertyName, string companyName, string address, string city)
    : base(fName, lName, email, password, phoneNumber)
    {
        PropertyName = propertyName;
        CompanyName = companyName;
        Address = address;
        City = city;
    }
}
