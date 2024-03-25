using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.PropertySystem.Services
{
    public interface IReservationService
    {
        Task<ActionResult<Reservation>> CreateReservation(Reservation room);
        Task<ActionResult<Reservation>> DeleteReservation(Reservation room);
        Task<ActionResult<List<Reservation>>> GetAllReservations();
        Task<ActionResult<List<Reservation>>> GetAllReservationsByUserId(string id);


    }
}