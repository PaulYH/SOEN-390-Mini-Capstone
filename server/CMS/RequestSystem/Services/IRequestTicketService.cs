﻿using CMS.Api.PropertySystem.Entities;
using CMS.Api.RequestSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.RequestSystem.Services
{
    public interface IRequestTicketService
    {
        Task<ActionResult<RequestTicket>> CreateRequestTicket(RequestTicket requestTicket); // accessible by owner and renter
        Task<ActionResult<RequestTicket>> UpdateRequestTicket(RequestTicket requestTicket); // accesible only by Employee
        Task<ActionResult<IEnumerable<RequestTicket>>> GetAll(); // accessible by everyone 
        Task<ActionResult<RequestTicket>> GetRequestTicketWithPosts(string ticketId); // accessible by everyone
        Task<ActionResult<IEnumerable<RequestTicket>>> GetRequestTicketsByCreatedBy(string createdBy); // accessible by everyone
        Task<ActionResult<IEnumerable<RequestTicket>>> GetRequestTicketsByAssignedTo(string assignedTo); // accessible by everyone

    }
}
