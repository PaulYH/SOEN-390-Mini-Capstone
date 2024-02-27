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
        Task<ActionResult<CondoUnit>> GetCondoUnitsById(Guid id);
        Task<ActionResult<CondoUnit>> CreateCondoUnit(CondoUnit condoUnit);
        Task<bool> DeleteCondoUnit(Guid id);

    }
}
