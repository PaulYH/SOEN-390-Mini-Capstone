using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.RequestSystem.Enums;
using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.RequestSystem.Services;
using CMS.Api.RequestSystem.Entities;

namespace CMS.Api.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class TicketPostController : ControllerBase
    {
        private readonly ITicketPostService _ticketPostService;

        public TicketPostController(ITicketPostService ticketPostService)
        {
            _ticketPostService = ticketPostService;
        }

        [HttpPost]
        public async Task<ActionResult<TicketPost>> CreateTicketPost(TicketPost request, string requestTicketId)
        {
            if (request is null || request.CreatedBy is null) { return BadRequest(); }
            var createdPost = await _ticketPostService.CreateTicketPost(request, requestTicketId);
            return Ok(createdPost);
        }

        [HttpPut("{postId}")]
        public async Task<ActionResult<TicketPost>> ViewTicketPost(string postId)
        {
            var updatedPost = await _ticketPostService.ViewTicketPost(postId);
            return Ok(updatedPost);
        }


    }
}
