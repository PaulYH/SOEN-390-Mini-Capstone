using CMS.Api.Data;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace CMS.Api.RequestSystem.Services
{
    public class RequestTicketService : IRequestTicketService
    {
        private readonly CMSDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public RequestTicketService(CMSDbContext context, UserManager<ApplicationUser> userManager)
        { 
            _context = context;
            _userManager = userManager;
        }

        public async Task<ActionResult<IEnumerable<RequestTicket>>> GetAll()
        {
            return await _context.RequestTickets.Include(r => r.CreatedBy).ToListAsync();
        }

        public async Task<ActionResult<RequestTicket>> CreateRequestTicket(RequestTicket request)
        {
            RequestTicket ticket = new RequestTicket();

            ApplicationUser? createdBy = await _context.Users.FindAsync(request.CreatedBy.Id);
            if (createdBy is null) { return null; }

            ticket.ExternalTicketId = _context.RequestTickets.Count() > 0 ?
                _context.RequestTickets.OrderBy(r => r.ExternalTicketId).Last().ExternalTicketId + 1 : 1;
            ticket.CreationDate = DateTime.Now;
            ticket.IsMuted = request.IsMuted;
            ticket.Title = request.Title;
            ticket.Description = request.Description;
            ticket.Status = StatusType.Pending;
            ticket.Category = request.Category;
            ticket.CreatedBy = createdBy;

            ticket.AssignedTo = _userManager.GetUsersInRoleAsync("Employee").Result.OrderBy(u => Guid.NewGuid()).First();
                
            //var hh = _userManager.GetUsersInRoleAsync("Employee").Result.OrderBy(u => Guid.NewGuid()).First();

            _context.RequestTickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<ActionResult<RequestTicket>> UpdateRequestTicket(RequestTicket request)
        {
            RequestTicket? ticket = await _context.RequestTickets.FindAsync(request.Id);
            if (ticket is null) { return null; }

            ticket.Title = request.Title;
            ticket.Description = request.Description;
            ticket.Category = request.Category;
            ticket.IsMuted = request.IsMuted;
            ticket.Status = request.Status;
            if (ticket.Status == StatusType.Resolved) { ticket.ResolutionDate = DateTime.Now; }

            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<ActionResult<RequestTicket>> GetRequestTicketWithPosts(string ticketId)
        {
            RequestTicket? ticket = await _context.RequestTickets
                .Include(t => t.CreatedBy)
                .Include(t => t.AssignedTo)
                .Include(t => t.TicketPosts)

                .FirstOrDefaultAsync(x => x.Id == Guid.Parse(ticketId));

            if (ticket is null) { return null; }
            return ticket;
        }

        public async Task<ActionResult<IEnumerable<RequestTicket>>> GetRequestTicketsByCreatedBy(string createdby)
        {
            List<RequestTicket> tickets = await _context.RequestTickets
                .Include(t => t.CreatedBy)
                .Include(t => t.AssignedTo)
                .Include(t => t.TicketPosts)
                .Where(x => x.CreatedBy.Id == createdby)
                .ToListAsync();
            return tickets;
        }
        public async Task<ActionResult<IEnumerable<RequestTicket>>> GetRequestTicketsByAssignedTo(string assignedTo)
        {
            List<RequestTicket> tickets = await _context.RequestTickets
                .Include(t => t.CreatedBy)
                .Include(t => t.AssignedTo)
                .Include(t => t.TicketPosts)
                .Where(x => x.AssignedTo.Id == assignedTo)
                .ToListAsync();
            return tickets;
        }
    }
}
