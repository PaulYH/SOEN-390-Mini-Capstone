using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;

namespace CMS.PropertySystem.Entities;
public class CondoUnit
{
    [Key]
    public Guid Id { get; set; }
    public int ExternalUnitId { get; set; } = -1;
    public Guid RegistrationKey { get; set; } = Guid.NewGuid();
    public int Size { get; set; } = -1;
    [Column(TypeName = "decimal(6, 2)")]
    public decimal FeePerSquareFoot { get; set; } = -1;
    public OwnerUser Owner { get; set; } = null!;
    public ApplicationUser Occupant { get; set; } = null!;
}
