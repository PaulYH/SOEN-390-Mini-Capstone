using CMS.Api.PropertySystem.Entities;
using CMS.Api.RequestSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.RequestSystem.Services
{
    public interface ITicketPostService
    {
        Task<ActionResult<TicketPost>> CreateTicketPost(TicketPost ticketPost, string requestTicketId ); // accessible by owner and renter
        Task<ActionResult<TicketPost>> ViewTicketPost(string postId);
        Task<ActionResult<IEnumerable<TicketPost>>> GetAll();


    }
}
