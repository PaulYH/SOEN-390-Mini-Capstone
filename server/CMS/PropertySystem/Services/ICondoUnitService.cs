using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace CMS.Api.PropertySystem.Services
{
    public interface ICondoUnitService
    {
        Task<ActionResult<List<CondoUnit>>> GetCondoUnitsByEmail(string email);
        Task<ActionResult<List<CondoUnit>>> GetOwnedCondoUnitsByUser(string id);
        Task<ActionResult<CondoUnit>> GetOccupantCondoUnitByUser(string id);
        Task<ActionResult<CondoUnit>> CreateCondoUnit(CondoUnit condoUnit);
        Task<bool> DeleteCondoUnit(Guid id);
        Task<ActionResult<CondoUnit>> SetUnitOwner(Guid unitId, string ownerId);
        Task<ActionResult<CondoUnit>> SetUnitOccupant(Guid unitId, string occupantId);
        Task<ActionResult<CondoUnit>> GetCondoUnitById(Guid id);
        Task<ActionResult<CondoUnit>> UpdateCondoUnit(CondoUnit updatedCondoUnit);

    }
}
