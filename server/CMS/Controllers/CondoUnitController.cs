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
    [Route("api/condounits")]
    [ApiController]
    public class CondoUnitController : ControllerBase
    {
        private readonly ICondoUnitService _condoUnitService;
        private readonly IApplicationUserService _applicationUserService;
        public CondoUnitController(ICondoUnitService condoUnitService, IApplicationUserService userService) 
        {
            _condoUnitService = condoUnitService;
            _applicationUserService = userService;
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<CondoUnit>> GetCondoUnitsByEmail(string email)
        {
            var condos = await _condoUnitService.GetCondoUnitsByEmail(email);
            if (condos == null) 
            {
                return Ok(new List<CondoUnit>());
            }
            return Ok(condos);
        }

        [HttpPost]
        public async Task<ActionResult<CondoUnit>> CreateCondoUnit([FromBody] CreateCondoUnitRequest request)
        {
            CondoUnit condoUnit = new CondoUnit();
            condoUnit.ExternalUnitId = request.ExternalUnitId;
            condoUnit.Size = request.Size;
            condoUnit.FeePerSquareFoot = request.FeePerSquareFoot;

            var owner = await _applicationUserService.GetUserByEmail(request.CondoOwnerEmail);
            var occupant = await _applicationUserService.GetUserByEmail(request.CondoOccupantEmail);

            condoUnit.Owner = owner.Value;
            condoUnit.Occupant = occupant.Value;


            var result = await _condoUnitService.CreateCondoUnit(condoUnit);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<bool> DeleteCondoUnit(Guid id)
        {
            return await _condoUnitService.DeleteCondoUnit(id);
        }

        [HttpPut]
        public async Task<ActionResult<CondoUnit>> UpdateCondoUnit(CondoUnit updatedCondoUnit)
        {
            var condo = await _condoUnitService.UpdateCondoUnit(updatedCondoUnit);
            if (condo is null) return NotFound();
            return Ok(condo);
        }


        public class CreateCondoUnitRequest
        {
            public int ExternalUnitId { get; set; }
            public int Size { get; set; }
            public decimal FeePerSquareFoot { get; set; }
            public required string CondoOwnerEmail { get; set; }
            public required string CondoOccupantEmail { get; set; }

            /* should you make the owner id and occupand id an attribute here */

        }


    }
}
