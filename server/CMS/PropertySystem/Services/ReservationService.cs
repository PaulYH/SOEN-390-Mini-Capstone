//create,  update, get reservations 
//get reservations by user (ReservedBy.Id)
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
    public class ReservationService : IReservationService

    {

        private readonly CMSDbContext _context;
        public ReservationService(CMSDbContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<Reservation>> CreateRoom(Reservation room) 
        {
            _context.Reservations.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }
        public async Task<ActionResult<Reservation>> DeleteReservation(Reservation room) 
        {
            _context.Reservations.Remove(room);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task<ActionResult<List<Reservation>>> GetAllReservations() //httpGet
        {
            var rooms = await _context.Reservations
                .ToListAsync();
            return rooms;
        }

        public async Task<ActionResult<List<Reservation>>> GetAllReservationsByUserId(string id)  //httpget -> id
        {
            var reservations=await _context.Reservations.Where(x => x.ReservedBy.Id == id).ToListAsync();
            return reservations;
        }
    }
}
