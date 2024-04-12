﻿using CMS.Api.RequestSystem.Entities;
using CMS.Api.RequestSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.RequestSystem.Enums;

using CMS.Api.RequestSystem.Services;
using CMS.Api.PropertySystem.Entities;

namespace CMS.Api.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class RequestTicketController : ControllerBase
    {
        private readonly IRequestTicketService _requestTicketService;

        public RequestTicketController(IRequestTicketService requestTicketService)
        {
            _requestTicketService = requestTicketService;
        }

        [HttpPost] // Authorize owners/renters only
        public async Task<ActionResult<Locker>> CreateRequestTicket(RequestTicket request)
        {
            if (request is null || request.CreatedBy is null) { return NotFound(); }
            var createdTicket = await _requestTicketService.CreateRequestTicket(request);
            return Ok(createdTicket);
        }

        [HttpPut] // Authorize Employees only
        public async Task<ActionResult<RequestTicket>> UpdateRequestTicket(RequestTicket request)
        {
            if (request is null) { return NotFound(); }
            var updatedTicket = await _requestTicketService.UpdateRequestTicket(request);
            return Ok(updatedTicket);
        }

        [HttpGet] // Authorize Employees only
        public async Task<ActionResult<IEnumerable<RequestTicket>>> GetAll()
        {
            return await _requestTicketService.GetAll();
        }



    }
}
