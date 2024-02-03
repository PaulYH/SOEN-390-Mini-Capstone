using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Entities;

namespace CMS.PropertySystem.Entities;
public class Reservation
{
    [Key]
    public Guid Id { get; set; }
    public DateTime StartTime { get; set; } = DateTime.Now;
    public DateTime EndTime { get; set; } = DateTime.Now.AddHours(2);
    public ApplicationUser ReservedBy { get; set; } = null!;
}
