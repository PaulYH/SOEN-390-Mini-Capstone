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

        [HttpGet("owner/{id}")]
        public async Task<ActionResult<List<CondoUnit>>> GetOwnedCondoUnitsByUser(string id)
        {
            var condos = await _condoUnitService.GetOwnedCondoUnitsByUser(id);
            if (condos == null) return NotFound();
            return Ok(condos);
        }

        [HttpGet("occupant/{id}")]
        public async Task<ActionResult<List<CondoUnit>>> GetOccupantCondoUnitByUser(string id)
        {
            var condo = await _condoUnitService.GetOccupantCondoUnitByUser(id);
            if (condo == null) return NotFound();
            return Ok(condo);
        }

        [HttpPost]
        public async Task<ActionResult<CondoUnitDto>> CreateCondoUnit([FromBody] CreateCondoUnitRequest request)
        {
            CondoUnit condoUnit = new CondoUnit();
            condoUnit.ExternalUnitId = request.ExternalUnitId;
            condoUnit.Size = request.Size;
            condoUnit.FeePerSquareFoot = request.FeePerSquareFoot;

            var result = await _condoUnitService.CreateCondoUnit(condoUnit);

            var returnUnit = new CondoUnitDto()
            {
                Id = result.Value.Id,
                ExternalUnitId = result.Value.ExternalUnitId,
                Size = result.Value.Size,
                FeePerSquareFoot = result.Value.FeePerSquareFoot,
                OwnerEmail = "",
                OccupantEmail = ""
            };

            return Ok(returnUnit);
        }

        [HttpDelete]
        public async Task<bool> DeleteCondoUnit(Guid id)
        {
            return await _condoUnitService.DeleteCondoUnit(id);
        }

        [HttpPut("assign-owner-key/{condoId}/{ownerId}")]
        public async Task<ActionResult<CondoUnit>> SetUnitOwner(Guid condoId, string ownerId)
        {
            var condoUnit = await _condoUnitService.SetUnitOwner(condoId, ownerId);

            if (condoUnit == null)
                return BadRequest();
            return Ok(condoUnit);
        }

        [HttpPut]
        public async Task<ActionResult<CondoUnit>> UpdateCondoUnit(CondoUnit updatedCondoUnit)
        {
            var condo = await _condoUnitService.UpdateCondoUnit(updatedCondoUnit);
            if (condo is null) return NotFound();
            return Ok(condo);
        }

        [HttpPut("assign-occupant-key/{condoId}/{ownerId}")]
        public async Task<ActionResult<CondoUnit>> SetUnitOccupant(Guid condoId, string ownerId)
        {
            var condoUnit = await _condoUnitService.SetUnitOccupant(condoId, ownerId);

            if (condoUnit == null)
                return BadRequest();
            return Ok(condoUnit);
        }
        public class CreateCondoUnitRequest
        {
            public int ExternalUnitId { get; set; }
            public int Size { get; set; }
            public decimal FeePerSquareFoot { get; set; }

        }


    }
}
