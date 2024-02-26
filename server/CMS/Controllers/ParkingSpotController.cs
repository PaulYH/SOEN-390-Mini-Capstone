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
    [Route("api/parkingspots")]
    [ApiController]
    public class ParkingSpotController : ControllerBase
    {
        private readonly IParkingSpotService _parkingSpotService;
        private readonly IApplicationUserService _applicationUserService;

        public ParkingSpotController(IParkingSpotService parkingSpotService,
            IApplicationUserService applicationUserService)
        {
            _parkingSpotService = parkingSpotService;
            _applicationUserService = applicationUserService;
        }

        [HttpPost]
        public async Task<ActionResult<ParkingSpot>> CreateParkingSpot(ParkingSpot request)
        {
            if (request is null) { return NotFound(); }
            var owner = await _applicationUserService.GetUserById(request.Owner.Id);
            if (owner != null) { request.Owner = owner.Value; }
            var createdParkingSpot = await _parkingSpotService.CreateParkingSpot(request);
            return Ok(createdParkingSpot);
        }

        [HttpPut]
        public async Task<ActionResult<Locker>> UpdateParkingSpot(ParkingSpot request)
        {
            if (request is null) { return NotFound(); }
            var owner = await _applicationUserService.GetUserById(request.Owner.Id);
            if (owner == null) { return NotFound(); }
            else { request.Owner = owner.Value; }

            var locker = await _parkingSpotService.UpdateParkingSpot(request);
            if (locker is null) { return NotFound(); }
            return Ok(locker);
        }
    }
}
