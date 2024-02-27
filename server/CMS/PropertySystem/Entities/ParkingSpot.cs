using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class ParkingSpot
    {
        [Key]
        public Guid Id { get; set; }
        public int ExternalSpotId { get; set; } = -1;
        [Column(TypeName = "decimal(6, 2)")]
        public decimal SpotFee { get; set; } = -1;
        [ForeignKey(nameof(ApplicationUser))]
        public ApplicationUser? Owner { get; set; } = null!; // TODO: add role verification
    }
}
