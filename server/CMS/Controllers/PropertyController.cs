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
        private readonly ILockerService _lockerService;
        private readonly IParkingSpotService _parkingSpotService;
        private readonly IApplicationUserService _applicationUserService;
        public PropertyController(IPropertyService propertyService,
            ILockerService lockerService,
            IParkingSpotService parkingSpotService,
            IApplicationUserService applicationUserService)
        {
            _propertyService = propertyService;
            _lockerService = lockerService;
            _parkingSpotService = parkingSpotService;
            _applicationUserService = applicationUserService;
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

            var createdProperty = await _propertyService.CreateProperty(property);

            return Ok(createdProperty);
        }

        [HttpPut]
        public async Task<ActionResult<Property>> UpdateProperty(Property updatedProperty)
        {
            var returnedProperty = await _propertyService.GetPropertyById(updatedProperty.Id);

            if (returnedProperty is null) return NotFound();
            var property = returnedProperty.Value;
            if (property is null) return NotFound();

            if (property.Lockers is null) property.Lockers = new List<Locker>();
            if (property.ParkingSpots is null) property.ParkingSpots = new List<ParkingSpot>();

            if (updatedProperty.Lockers != null)
            {
                foreach (Locker l in updatedProperty.Lockers)
                {
                    l.Property = null;
                    l.Owner = null;

                    var createdLocker = await _lockerService.CreateLocker(l);
                    if (createdLocker.Value != null)
                    {
                        property.Lockers.Add(createdLocker.Value);
                    }
                }
            }

            if (updatedProperty.ParkingSpots != null)
            {
                foreach (ParkingSpot p in updatedProperty.ParkingSpots)
                {
                    p.Property = null;
                    p.Owner = null;

                    var createdSpot = await _parkingSpotService.CreateParkingSpot(p);
                    if (createdSpot.Value != null)
                    {
                        property.ParkingSpots.Add(createdSpot.Value);
                    }
                }
            }

            await _propertyService.UpdateProperty(property);

            return Ok(property);
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteProperty(Guid id)
        {
            return Ok(await _propertyService.DeleteProperty(id));
        }
    }
}
