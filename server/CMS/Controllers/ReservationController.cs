using CMS.Api.PropertySystem.Entities;
using CMS.Api.PropertySystem.Services;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace CMS.Api.Controllers
{
    public class ReservationController
    {



        [Route("api/reservations")]
        [ApiController]
        public class ReservationController : ControllerBase

        {
            private readonly IReservationService _reservationService;
     
            private readonly IApplicationUserService _applicationUserService;
            public ReservationController(IReservationService reservationService,
                
                IApplicationUserService applicationUserService)
            {
                _reservationService = reservationService;
                
                _applicationUserService = applicationUserService;
            }

            [HttpGet]
            public async Task<ActionResult<List<Reservation>>> GetAllReservations()
            {
                var reservations = await _reservationService.GetAllReservations();
                return Ok(reservations);
            }


            [HttpGet("{id}")]
            public async Task<ActionResult<Reservation>> GetAllReservationsByUserId(string id)
            {
                var reservation = await _reservationService.GetAllReservationsByUserId(id);
                return Ok(reservation);
            }

            [HttpGet("/condo-units/{id}")]
            public async Task<ActionResult<List<CondoUnit>>> GetAllCondoUnits(Guid id)
            {
                var condoUnits = await _reservationService.GetAllCondoUnits(id);
                if (condoUnits == null) return NotFound();
                return Ok(condoUnits);
            }
            [HttpPost]
            public async Task<ActionResult<Reservation>> CreateReservation(Reservation request)
            {
                Reservation reservation = new Reservation();
                property.PropertyName = request.PropertyName;
                property.CompanyName = request.CompanyName;
                property.Address = request.Address;
                property.City = request.City;

                var createdReservation = await _reservationService.CreateReservation(property);

                return Ok(createdReservation);
            }

            [HttpPut]
            public async Task<ActionResult<Reservation>> UpdatePropertyProfile(Reservation updatedProperty)
            {
                var returnedProperty = await _reservationService.GetPropertyById(updatedProperty.Id);

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

                await _reservationService.UpdateProperty(property);

                return Ok(property);
            }

            [HttpPut("add-condo/{propertyId}/{condoId}")]
            public async Task<ActionResult<CondoUnit>> AssociateCondoUnitWithProperty(Guid propertyId, Guid condoId)
            {
                var unit = await _reservationService.AssociateCondoUnitWithProperty(propertyId, condoId);
                if (unit is null) return NotFound();
                return Ok(unit);
            }

            [HttpDelete]
            public async Task<ActionResult<bool>> DeleteProperty(Guid id)
            {
                return Ok(await _reservationService.DeleteProperty(id));
            }

            [HttpPost("{id}/upload")]
            public async Task<ActionResult<string>> UploadFile(Guid id, IFormFile file)
            {
                try
                {
                    var result = await _reservationService.WriteFile(id, file);
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
                var filePath = await _reservationService.DownloadFile(id, fileName);
                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(filePath, out var contentType))
                    contentType = "application/octet-stream";

                var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(bytes, contentType, Path.GetFileName(filePath));
            }

            [HttpGet("{id}/allFileNames")]
            public async Task<ActionResult<List<string>>> GetAllFileNames(Guid id)
            {
                var fileNames = await _reservationService.GetAllFileNames(id);

                if (fileNames == null)
                    return NotFound("The requested file does not exist");

                return Ok(fileNames);
            }
        }
    }

}
