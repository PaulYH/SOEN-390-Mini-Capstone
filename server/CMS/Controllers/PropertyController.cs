using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Authorization;
using CMS.Api.UserSystem.Enum;
using CMS.Api.PropertySystem.Services;
using Microsoft.AspNetCore.StaticFiles;

namespace CMS.Api.Controllers

{
    [Route("api/properties")]
    [ApiController]
    public class PropertyController : ControllerBase

    {
        private readonly IPropertyService _propertyService;
        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Property>>> GetAllProperties()
        {
            var properties = await _propertyService.GetAllProperties();
            return Ok(properties);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetPropertyById(Guid id)
        {
            var property = await _propertyService.GetPropertyById(id);
            return Ok(property);
        }

        [HttpPost]
        public async Task<ActionResult<Property>> CreateProperty(Property request)
        {
            Property property = new Property();
            property.PropertyName = request.PropertyName;
            property.CompanyName = request.CompanyName;
            property.Address = request.Address;
            property.City = request.City;
            return await _propertyService.CreateProperty(property);
        }

        [HttpPut]
        public async Task<ActionResult<Property>> UpdatePropertyProfile(Property updatedProperty)
        {
            var property = await _propertyService.UpdatePropertyProfile(updatedProperty);
            if (property is null) return NotFound();
            return Ok(property);
        }

        [HttpPut("add-condo/{propertyId}/{condoId}")]
        public async Task<ActionResult<CondoUnit>> AssociateCondoUnitWithProperty(Guid propertyId, Guid condoId)
        {
            var unit = await _propertyService.AssociateCondoUnitWithProperty(propertyId, condoId);
            if (unit is null) return NotFound();
            return Ok(unit);
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteProperty(Guid id)
        {
            return Ok(await _propertyService.DeleteProperty(id));
        }

        [HttpPost("{id}/upload")]
        public async Task<ActionResult<string>> UploadFile(Guid id, IFormFile file)
        {
            try
            {
                var result = await _propertyService.WriteFile(id, file);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest("Failed to upload file");
            } 
        }

        [HttpGet("{id}/download/{fileName}")]
        public async Task<ActionResult> DownloadFile(Guid id, string fileName)
        {
            var filePath = await _propertyService.DownloadFile(id, fileName);
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filePath, out var contentType))
                contentType = "application/octet-stream";

            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType, Path.GetFileName(filePath));
        }

        [HttpGet("{id}/allFileNames")]
        public async Task<ActionResult<List<string>>> GetAllFileNames(Guid id)
        {
            var fileNames = await _propertyService.GetAllFileNames(id);

            if (fileNames == null)
                return NotFound("The requested file does not exist");
            
            return Ok(fileNames);
        }
    }
}
