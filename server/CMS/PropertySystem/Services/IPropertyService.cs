using Microsoft.AspNetCore.Mvc;
using CMS.Api.PropertySystem.Entities;

namespace CMS.Api.PropertySystem.Services
{
    public interface IPropertyService

    {
        Task<ActionResult<List<Property>>> GetAllProperties();
        Task<ActionResult<Property>> GetPropertyById(Guid id);

    }
}
