using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Entities;

namespace CMS.PropertySystem.Entities;
public class ParkingSpot
{
    [Key]
    public Guid Id { get; set; }
    public int ExternalSpotId { get; set; } = -1;
    [Column(TypeName = "decimal(6, 2)")]
    public decimal SpotFee { get; set; } = -1;
    public OwnerUser Owner { get; set; } = null!;
    public ApplicationUser Occupant { get; set; } = null!;
}
