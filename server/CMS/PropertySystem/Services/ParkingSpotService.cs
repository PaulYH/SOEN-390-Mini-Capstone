using Microsoft.AspNetCore.Mvc;
using CMS.Api.Data;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;

namespace CMS.Api.PropertySystem.Services
{
    public class ParkingSpotService : IParkingSpotService
    {
        private readonly CMSDbContext _context;
        public ParkingSpotService(CMSDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<ParkingSpot>> CreateParkingSpot(ParkingSpot parkingSpot)
        {
            _context.ParkingSpots.Add(parkingSpot);
            await _context.SaveChangesAsync();
            return parkingSpot;
        }


        public async Task<ActionResult<ParkingSpot>> UpdateParkingSpot(ParkingSpot updatedParkingSpot)
        {
            var parkingSpot = await _context.ParkingSpots.FindAsync(updatedParkingSpot.Id);
            if (parkingSpot == null) { return null; }
            parkingSpot.SpotFee = updatedParkingSpot.SpotFee;
            parkingSpot.ExternalSpotId = updatedParkingSpot.ExternalSpotId;
            parkingSpot.Owner = updatedParkingSpot.Owner;
            await _context.SaveChangesAsync();
            return parkingSpot;
        }
    }
}
