using Microsoft.AspNetCore.Mvc;
using CMS.Api.PropertySystem.Entities;

namespace CMS.Api.PropertySystem.Services
{
    public interface IPropertyService

    {
        Task<ActionResult<List<Property>>> GetAllProperties();
        Task<ActionResult<Property>> GetPropertyById(Guid id);
        Task<ActionResult<Property>> CreateProperty(Property property);
        Task<ActionResult<Property>> UpdateProperty(Property updatedProperty);
        Task<ActionResult<bool>> DeleteProperty(Guid id);
        Task<ActionResult<string>> WriteFile(Guid id, IFormFile file);
        Task<string> DownloadFile(Guid id, string fileName);
        Task<ActionResult<List<string>>> GetAllFileNames(Guid id);

    }
}
