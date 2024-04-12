using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.RequestSystem.Services;

namespace CMS.Api.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketPostController : ControllerBase
    {
        private readonly ITicketPostService _ticketPostService;

        public TicketPostController(ITicketPostService ticketPostService)
        {
            _ticketPostService = ticketPostService;
        }
    }
}
