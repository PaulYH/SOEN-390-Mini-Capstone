using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class Reservation
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime EndTime { get; set; } = DateTime.Now.AddHours(2);
        public PublicUser ReservedBy { get; set; } = null!; // TODO: add role verification
    }
}
