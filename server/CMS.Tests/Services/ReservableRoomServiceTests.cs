using CMS.Api.PropertySystem.Entities;
using CMS.Api.PropertySystem.Services;
using CMS.Tests.Services.TestBases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests.Services
{
    public class ReservableRoomServiceTests : ReservableRoomServiceTestsBase
    {
        private readonly IReservableRoomService _reservableRoomService;

        public ReservableRoomServiceTests()
        {
            _reservableRoomService = new ReservableRoomService(_context);
        }

        [Fact]
        public async Task CreateRoom_ShouldReturnRoom_WhenDataFound()
        {
            //Arrange
            var room = new ReservableRoom()
            {
                Id = Guid.NewGuid(),
                ExternalRoomId = 5,
                Name = "TestRoom",
                Reservations = new List<Reservation>()
            };

            //Act
            var result = await _reservableRoomService.CreateRoom(room);

            //Assert
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task DeleteRoom_ShouldReturnDeletedRoom_WhenDataFound()
        {
            //Arrange
            var room = _context.ReservableRooms.First();

            //Act
            var result = await _reservableRoomService.DeleteRoom(room);

            //Assert
            result.Should().NotBeNull();
            _context.ReservableRooms.Count().Should().Be(2);
        }

        [Fact]
        public async Task UpdateRoom_ShouldReturnUpdatedRoom_WhenDataFound()
        {
            //Arrange
            var room = _context.ReservableRooms.First();
            var oldRoomId = room.ExternalRoomId;
            room.ExternalRoomId = oldRoomId + 1;

            //Act
            var result = await _reservableRoomService.UpdateRoom(room);

            //Assert
            result.Should().NotBeNull();
            _context.ReservableRooms.Count().Should().Be(3);
            result.Value.ExternalRoomId.Should().Be(oldRoomId + 1);
        }

        [Fact]
        public async Task GetAllReservableRooms_ShouldReturnRoomList_WhenDataFound()
        {
            //Act
            var result = await _reservableRoomService.GetAllReservableRooms();

            //Assert
            result.Should().NotBeNull();
            result.Value.Count().Should().Be(3);
        }
    }
}
