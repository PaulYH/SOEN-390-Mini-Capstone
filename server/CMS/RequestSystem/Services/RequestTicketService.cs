using CMS.Api.Data;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.UserSystem.Entities;


namespace CMS.Api.RequestSystem.Services
{
    public class RequestTicketService : IRequestTicketService
    {
        private readonly CMSDbContext _context;
        public RequestTicketService(CMSDbContext context) 
        { _context = context;}

        public async Task<ActionResult<RequestTicket>> CreateRequestTicket(RequestTicket requestTicket)
        {
            RequestTicket requestToAdd = new RequestTicket();

            ApplicationUser? createdBy = _context.Users.Find(requestTicket.CreatedBy.Id);
            if (createdBy is null) { return null; }

            requestToAdd.ExternalTicketId = _context.RequestTickets.Count() > 0 ? 
                _context.RequestTickets.Last().ExternalTicketId + 1 : 
                1;
            requestToAdd.CreationDate = DateTime.Now;
            requestToAdd.IsMuted = requestTicket.IsMuted;
            requestToAdd.Title = requestTicket.Title;
            requestToAdd.Description = requestTicket.Description;
            requestToAdd.Status = StatusType.Pending;
            requestToAdd.Category = requestTicket.Category;
            requestToAdd.CreatedBy = createdBy;
            requestToAdd.AssignedTo = _context.Users.OrderBy(u => Guid.NewGuid()).First();

            _context.RequestTickets.Add(requestToAdd);
            await _context.SaveChangesAsync();
            return requestToAdd;
        }


    }
}
