using Microsoft.AspNetCore.Mvc;
using CMS.Api.Data;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;
using CMS.Api.UserSystem.Entities;
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
            _context.ReservableRooms.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }
        public async Task<ActionResult<ReservableRoom>> DeleteRoom(ReservableRoom room)
        {
            _context.ReservableRooms.Remove(room);
            await _context.SaveChangesAsync();
            return room;
        }
        public async Task<ActionResult<ReservableRoom>> UpdateRoom(ReservableRoom updatedRoom)
        {
            var room = await _context.ReservableRooms.FindAsync(updatedRoom.Id);
            if (room == null) { return null; }
            room.ExternalRoomId = updatedRoom.ExternalRoomId.Equals(null) ?
                room.ExternalRoomId : updatedRoom.ExternalRoomId;
            await _context.SaveChangesAsync();
            return room;
        }
    
        public async Task<ActionResult<List<ReservableRoom>>> GetAllReservableRooms()
        {
            var rooms = await _context.ReservableRooms
                .ToListAsync();
            return rooms;
        }
    }
}
