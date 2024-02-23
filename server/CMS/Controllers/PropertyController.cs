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
        public async Task<ActionResult<Property>> CreateProperty(CreatePropertyRequest request)
        {
            Property property = new Property();
            property.PropertyName = request.PropertyName;
            property.CompanyName = request.CompanyName;
            property.Address = request.Address;
            property.City = request.City;
            return await _propertyService.CreateProperty(property);

        }


        public class CreatePropertyRequest
        {
            public string PropertyName { get; set; } = String.Empty;
            public string CompanyName { get; set; } = String.Empty;
            public string Address { get; set; } = String.Empty;
            public string City { get; set; } = String.Empty;
        }
    }
}
