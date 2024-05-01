using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.PropertySystem.Services
{
    public interface IReservableRoomService
    {
        Task<ActionResult<ReservableRoom>> CreateRoom(ReservableRoom room);
        Task<ActionResult<ReservableRoom>> UpdateRoom(ReservableRoom updatedRoom);
        Task<ActionResult<ReservableRoom>> DeleteRoom(ReservableRoom room);
        Task<ActionResult<List<ReservableRoom>>> GetAllReservableRooms();

    }
}
