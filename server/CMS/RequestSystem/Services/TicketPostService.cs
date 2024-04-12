using CMS.Api.Data;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.EntityFrameworkCore;


namespace CMS.Api.RequestSystem.Services
{
    public class TicketPostService : ITicketPostService
    {
        private readonly CMSDbContext _context;
        public TicketPostService(CMSDbContext context)
        { _context = context; }

        public async Task<ActionResult<IEnumerable<TicketPost>>> GetAll()
        {
            return await _context.TicketPosts.ToListAsync();
        }

        public async Task<ActionResult<TicketPost>> CreateTicketPost(TicketPost request, string requestTicketId)
        {
            ApplicationUser? createdBy = await _context.Users
                //.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == request.CreatedBy.Id);   //.Find(request.CreatedBy.Id);

            if (createdBy is null) { return null; }

            TicketPost post = new TicketPost();

            var r = _context.RequestTickets.OrderBy(r => r.ExternalTicketId);
            var t = _context.RequestTickets.ToList();

            post.ExternalPostId = _context.TicketPosts.Count() > 0 ?
                _context.RequestTickets.OrderBy(r => r.ExternalTicketId).Last().ExternalTicketId + 1 : 1;
            post.Viewed = false;
            post.Description = request.Description;
            post.CreatedBy = createdBy;
            post.ReplyTo = request.ReplyTo;

            // add post to database
            _context.TicketPosts.Add(post);
            await _context.SaveChangesAsync();

            // create association with request ticket
            RequestTicket? requestTicket = _context.RequestTickets.Find(Guid.Parse(requestTicketId));
            if (requestTicket is null) { return null; }
            requestTicket.TicketPosts.Add(post);

            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<ActionResult<TicketPost>> ViewRequestTicket(RequestTicket request)
        {
            TicketPost? ticket = await _context.TicketPosts.FindAsync(request.Id);
            if (ticket is null) { return null; }
            ticket.Viewed = true;

            _context.TicketPosts.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }
    }
}
