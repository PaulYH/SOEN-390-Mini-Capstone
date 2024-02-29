using Microsoft.AspNetCore.Mvc;
using CMS.Api.PropertySystem.Entities;

namespace CMS.Api.PropertySystem.Services
{
    public interface IPropertyService

    {
        Task<ActionResult<List<Property>>> GetAllProperties();
        Task<ActionResult<Property>> GetPropertyById(Guid id);
        Task<ActionResult<Property>> CreateProperty(Property property);
        Task<ActionResult<Property>> UpdatePropertyProfile(Property updatedProperty);
        Task<ActionResult<CondoUnit>> AddPropertyCondoUnit(Guid propertyId, Guid condoId);
        Task<ActionResult<bool>> DeleteProperty(Guid id);



    }
}
