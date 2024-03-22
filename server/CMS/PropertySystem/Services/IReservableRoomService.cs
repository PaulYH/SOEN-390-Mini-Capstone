using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Api.PropertySystem.Services
{
    public interface IReservableRoomService
    {
        Task<ActionResult<ReservableRoomService>> CreateRoom(ReservableRoomService room);
        Task<ActionResult<ReservableRoomService>> UpdateRoom(ReservableRoomService updatedRoom);
    }
}
