using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.UserSystem.Enum;
using CMS.Api.PropertySystem.Services;


namespace CMS.Api.Controllers
{
    [Route("api/lockers")]
    [ApiController]
    public class LockerController : ControllerBase
    {
        private readonly ILockerService _lockerService;
        private readonly IApplicationUserService _applicationUserService;

        public LockerController(ILockerService lockerService,
            IApplicationUserService applicationUserService)
        {
            _lockerService = lockerService;
            _applicationUserService = applicationUserService;
        }

        [HttpPost]
        public async Task<ActionResult<Locker>> CreateLocker(Locker request)
        {
            if (request is null || request.Owner is null) { return NotFound(); }
            var owner = await _applicationUserService.GetUserById(request.Owner.Id);
            if (owner != null) { request.Owner = owner.Value; }
            var createdLocker = await _lockerService.CreateLocker(request);
            return Ok(createdLocker);
        }

        [HttpPut]
        public async Task<ActionResult<Locker>> UpdateLocker(Locker request)
        {
            if (request is null) { return NotFound(); }
            var owner = await _applicationUserService.GetUserById(request.Owner.Id);
            if (owner == null) { return NotFound(); }
            else { request.Owner = owner.Value; }

            var locker = await _lockerService.UpdateLocker(request);
            if (locker is null) { return NotFound(); }
            return Ok(locker);
        }
    }
}