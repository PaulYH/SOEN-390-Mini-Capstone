using CMS.Api.RequestSystem.Enums;
using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.RequestSystem.Entities
{
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

        public StatusType Status { get; set; }
        public CategoryType Category { get; set; }

        public ApplicationUser CreatedBy { get; set; } = null!;
        public ApplicationUser AssignedTo { get; set; } = null!;
        public ICollection<TicketPost> TicketPosts { get; set; } = null!;
    }
}
