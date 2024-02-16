using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class Property
    {
        [Key]
        public Guid Id { get; set; }
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
