using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Entities;

namespace CMS.RequestSystem.Entities;
public class TicketPost
{
    [Key]
    public Guid Id { get; set; }
    public bool Viewed { get; set; } = false;
    public string Description { get; set; } = String.Empty;
    public ApplicationUser CreatedBy { get; set; } = null!;
    public TicketPost ReplyTo { get; set; } = null!;
}
