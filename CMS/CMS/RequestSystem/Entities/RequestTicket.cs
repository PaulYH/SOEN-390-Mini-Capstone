using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Entities;

namespace CMS.RequestSystem.Entities;
public class RequestTicket
{
    [Key]
    public Guid Id { get; set; }
    public int ExternalTicketId { get; set; } = -1;
    public DateTime CreationDate { get; set; } = DateTime.Now;
    public DateTime? ResolutionDate { get; set; } = null!;
    public bool IsMuted { get; set; } = false;
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    
    // Add StatusType
    // Add CategoryType

    public ApplicationUser CreatedBy { get; set; } = null!;
    public EmployeeUser AssignedTo { get; set; } = null!;
    public ICollection<TicketPost> TicketPosts { get; set; } = null!; 
}
