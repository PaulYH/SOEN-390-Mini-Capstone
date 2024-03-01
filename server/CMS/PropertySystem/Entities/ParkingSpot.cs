using CMS.Api.UserSystem.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Api.PropertySystem.Entities
{
    public class ParkingSpot
    {
        [Key]
        public Guid Id { get; set; }
        public int ExternalSpotId { get; set; } = -1;
        [Column(TypeName = "decimal(6, 2)")]
        public decimal SpotFee { get; set; } = -1;

        // New PropertyId foreign key
        public Guid PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property? Property { get; set; }

        // Corrected Owner relationship
        public string OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public ApplicationUser? Owner { get; set; }
    }
}
