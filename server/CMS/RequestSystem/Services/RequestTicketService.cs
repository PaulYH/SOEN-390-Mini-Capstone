using CMS.Api.Data;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;


namespace CMS.Api.RequestSystem.Services
{
    public class RequestTicketService : IRequestTicketService
    {
        private readonly CMSDbContext _context;
        public RequestTicketService(CMSDbContext context)
        { _context = context; }

        public async Task<ActionResult<IEnumerable<RequestTicket>>> GetAll()
        {
            return await _context.RequestTickets.ToListAsync();
        }

        public async Task<ActionResult<RequestTicket>> CreateRequestTicket(RequestTicket request)
        {
            RequestTicket ticket = new RequestTicket();

            ApplicationUser? createdBy = _context.Users.Find(request.CreatedBy.Id);
            if (createdBy is null) { return null; }

            ticket.ExternalTicketId = _context.RequestTickets.Count() > 0 ?
                _context.RequestTickets.Last().ExternalTicketId + 1 :
                1;
            ticket.CreationDate = DateTime.Now;
            ticket.IsMuted = request.IsMuted;
            ticket.Title = request.Title;
            ticket.Description = request.Description;
            ticket.Status = StatusType.Pending;
            ticket.Category = request.Category;
            ticket.CreatedBy = createdBy;
            ticket.AssignedTo = await _context.Users.OrderBy(u => Guid.NewGuid()).FirstAsync();

            _context.RequestTickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<ActionResult<RequestTicket>> UpdateRequestTicket(RequestTicket request)
        {
            RequestTicket? ticket = await _context.RequestTickets.FindAsync(request.Id);
            if (ticket is null) { return null; }
            ticket.Status = request.Status;

            _context.RequestTickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<ActionResult<RequestTicket>> GetRequestTicketWithPosts(string ticketId)
        {
            RequestTicket? ticket = await _context.RequestTickets.FindAsync(ticketId);

            if (ticket is null) { return null; }
            return ticket;
        }
    }
}
