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
    public class ReservableRoomService : IReservableRoomService

    {
       
            private readonly CMSDbContext _context;
            public ReservableRoomService(CMSDbContext context)
            {
                _context = context;
            }
            public async Task<ActionResult<ReservableRoom>> CreateRoom(ReservableRoom room)
        {
            _context.Reservations.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }
        public async Task<ActionResult<ReservableRoom>> UpdateRoom(ReservableRoom updatedRoom)
        {
            var room = await _context.ParkingSpots.FindAsync(updatedRoom.Id);
            if (room == null) { return null; }
            room.SpotFee = updatedRoom.SpotFee.Equals(null) ?
                room.SpotFee : updatedRoom.SpotFee;
            room.ExternalSpotId = updatedRoom.ExternalRoomId.Equals(null) ?
                room.ExternalSpotId : updatedRoom.ExternalRoomId;
            room.Owner = updatedRoom.ReservedBy.Equals(null) ?
                room.Owner : updatedRoom.ReservedBy;
            await _context.SaveChangesAsync();
            return room;
        }
    }
}
