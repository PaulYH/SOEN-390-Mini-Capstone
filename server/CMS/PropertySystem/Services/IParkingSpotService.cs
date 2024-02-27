using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.PropertySystem.Services
{
    public interface IParkingSpotService
    {
        Task<ActionResult<ParkingSpot>> CreateParkingSpot(ParkingSpot parkingSpot);
        Task<ActionResult<ParkingSpot>> UpdateParkingSpot(ParkingSpot updatedParkingSpot);
    }
}