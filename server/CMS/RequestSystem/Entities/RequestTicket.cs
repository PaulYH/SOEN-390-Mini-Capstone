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

        // Add StatusType
        // Add CategoryType

        public ApplicationUser CreatedBy { get; set; } = null!; // TODO: add role verification
        public ApplicationUser AssignedTo { get; set; } = null!; // TODO: add role verification
        public ICollection<TicketPost> TicketPosts { get; set; } = null!;
    }
}
