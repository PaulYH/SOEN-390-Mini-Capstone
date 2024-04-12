﻿using CMS.Api.PropertySystem.Entities;
using CMS.Api.RequestSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.RequestSystem.Services
{
    public interface IRequestTicketService
    {
        Task<ActionResult<RequestTicket>> CreateRequestTicket(RequestTicket requestTicket); // accessible by owner and renter
        Task<ActionResult<RequestTicket>> UpdateRequestTicket(RequestTicket requestTicket); // accesible only by Employee
    }
}
