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

            if (updatedProperty.Lockers is not null)
            {
                foreach (Locker l in updatedProperty.Lockers)
                {
                    var owner = await _applicationUserService.GetUserById(l.Owner.Id);
                    l.Owner = owner.Value;
                    await _lockerService.CreateLocker(l);

                    property.Lockers.Add(l);
                }
            }
            if (updatedProperty.ParkingSpots is not null)
            {
                foreach (ParkingSpot p in updatedProperty.ParkingSpots)
                {
                    var owner = await _applicationUserService.GetUserById(p.Owner.Id);
                    p.Owner = owner.Value;
                    await _parkingSpotService.CreateParkingSpot(p);
                    property.ParkingSpots.Add(p);
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
