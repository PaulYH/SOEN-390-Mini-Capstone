using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class CondoUnit
    {
        [Key]
        public Guid Id { get; set; }
        public int ExternalUnitId { get; set; } = -1;
        public Guid RegistrationKey { get; set; } = Guid.NewGuid();
        public int Size { get; set; } = -1;
        [Column(TypeName = "decimal(6, 2)")]
        public decimal FeePerSquareFoot { get; set; } = -1;
        public ApplicationUser? Owner { get; set; }
        public ApplicationUser? Occupant { get; set; }
    }
}
