using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Api.UserSystem.Entities
{
    public class PropertyUser : IdentityUser
    {
        public string PropertyName { get; set; } = String.Empty;
        public string CompanyName { get; set; } = String.Empty;
        public string Address { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;
        public ICollection<CondoUnit>? CondoUnits { get; set; }
        public ICollection<ParkingSpot>? ParkingSpots { get; set; }
        public ICollection<Locker>? Lockers { get; set; }
        public ICollection<ReservableRoom>? ReservableRooms { get; set; }
    }
}
