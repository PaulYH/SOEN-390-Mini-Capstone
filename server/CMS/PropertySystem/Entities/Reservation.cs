using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class Reservation
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Name { get; set; } = String.Empty;
        public ApplicationUser ReservedBy { get; set; } = null!; // TODO: add role verification
    }
}
