using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class ReservableRoom
    {
        [Key]
        public Guid Id { get; set; }
        public int ExternalRoomId { get; set; } = -1;
        public string Name { get; set; } = String.Empty;
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
