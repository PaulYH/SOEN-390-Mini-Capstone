using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.PropertySystem;
using CMS.Api.PropertySystem.Services;
using CMS.Api.PropertySystem.Entities;


namespace CMS.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class CondoUnitControlller : ControllerBase
    {
        private readonly ICondoUnitService _condoUnitService;
        private readonly IApplicationUserService _applicationUserService;
        public CondoUnitControlller(ICondoUnitService condoUnitService) 
        {
            _condoUnitService = condoUnitService;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<CondoUnit>> GetCondoUnitsByEmail(string email)
        {
            var condos = await _condoUnitService.GetCondoUnitsByEmail(email);
            if (condos == null)  return NotFound(); 
            return Ok(condos);
        }

        [HttpPost]
        public async Task<ActionResult<CondoUnit>> CreateCondoUnit([FromBody] CreateCondoUnitRequest request)
        {
            CondoUnit condoUnit = new CondoUnit();
            condoUnit.ExternalUnitId = request.ExternalUnitId;
            condoUnit.Size = request.Size;
            condoUnit.FeePerSquareFoot = request.FeetPerSquareFoot;

            var owner = await _applicationUserService.GetUserByEmail(request.CondoOwnerEmail);
            var occupant = await _applicationUserService.GetUserByEmail(request.CondoOccupantEmail);

            condoUnit.Owner = owner.Value;
            condoUnit.Occupant = occupant.Value;



            return await _condoUnitService.CreateCondoUnit(condoUnit);
        }

        [HttpDelete]
        public async Task<bool> DeleteCondoUnit(int id)
        {
            return await _condoUnitService.DeleteCondoUnit(id);
        }


        public class CreateCondoUnitRequest
        {
            public int ExternalUnitId { get; set; }
            public int Size { get; set; }
            public decimal FeetPerSquareFoot { get; set; }
            public required string CondoOwnerEmail { get; set; }
            public required string CondoOccupantEmail { get; set; }

            /* should you make the owner id and occupand id an attribute here */

        }


    }
}
