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
    public string PropertyName { get; set; } = String.Empty;
    public string CompanyName { get; set; } = String.Empty;
    public string Address { get; set; } = String.Empty;
    public string City { get; set; } = String.Empty;
    public ICollection<ParkingSpot> ParkingSpots { get; set; } = null!;
    public ICollection<Locker> Lockers { get; set; } = null!;
    public ICollection<ReservableRoom> ReservableRooms { get; set; } = null!;

}
