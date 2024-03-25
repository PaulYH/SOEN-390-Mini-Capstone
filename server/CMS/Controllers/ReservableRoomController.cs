using CMS.Api.PropertySystem.Entities;
using CMS.Api.PropertySystem.Services;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.Controllers
{
    [Route("api/room")]
    [ApiController]
    public class ReservableRoomController : ControllerBase
    {
        private readonly IReservableRoomService _roomService;
        private readonly IApplicationUserService _applicationUserService;
        public ReservableRoomController(IReservableRoomService roomService,

               IApplicationUserService applicationUserService)
        {
            _roomService = roomService;

            _applicationUserService = applicationUserService;
        }
        [HttpGet]
        public async Task<ActionResult<List<ReservableRoom>>> GetAllReservableRooms()
        {
            var rooms = await _roomService.GetAllReservableRooms();
            return Ok(rooms);
        }
        [HttpPost]
        public async Task<ActionResult<ReservableRoom>> CreateRoom(ReservableRoom room)
        {
            ReservableRoom reservable = new ReservableRoom();
            room.ExternalRoomId = room.ExternalRoomId;
            room.Name = room.Name;

            var createdReservation = await _roomService.CreateRoom(reservable);
            return Ok(createdReservation);
        }
        [HttpDelete]
        public async Task<ActionResult<ReservableRoom>> DeleteRoom(ReservableRoom room)
        {
            return Ok(await _roomService.DeleteRoom(room));
        }

        [HttpPut]
        public async Task<ActionResult<ReservableRoom>> UpdateRoom(ReservableRoom updatedRoom)
        {
            var room = await _roomService.UpdateRoom(updatedRoom);
            if (room.Value is null) return NotFound();

            return Ok(room);
        }
    }
}

