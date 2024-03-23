using CMS.Api.PropertySystem.Entities;
using CMS.Api.PropertySystem.Services;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace CMS.Api.Controllers
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

           
            [HttpPost]
            public async Task<ActionResult<Reservation>> CreateReservation(Reservation room)
            {
                Reservation reservation = new Reservation();
                room.StartTime = room.StartTime;
                room.EndTime = room.EndTime;

                var createdReservation = await _reservationService.CreateReservation(reservation);
                return Ok(createdReservation);
            }

            
          

            [HttpDelete]
            public async Task<ActionResult<Reservation>> DeleteReservation(Reservation room)
            {
                return Ok(await _reservationService.DeleteReservation(room));
            }



           
        }
    }

}}
