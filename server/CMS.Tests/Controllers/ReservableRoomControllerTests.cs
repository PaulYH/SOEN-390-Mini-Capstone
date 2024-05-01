using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Api.PropertySystem.Services;
using CMS.Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.FinancialSystem;

namespace CMS.Tests.Controllers
{
    public class ReservableRoomControllerTests
    {
        private readonly IFixture _roomFixture = new Fixture();
        private readonly IFixture _applicationUserfixture = new Fixture();


        private readonly Mock<IReservableRoomService> _roomService;
        private readonly Mock<IApplicationUserService> _applicationUserService;
        private readonly ReservableRoomController _roomController;

        public ReservableRoomControllerTests()
        {
            _roomFixture = new Fixture();
            var fixtures = new List<IFixture> { _roomFixture, _applicationUserfixture };
            foreach (var fixture in fixtures)
            {
                fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                    .ForEach(b => fixture.Behaviors.Remove(b));
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            }
            //Mocking the services
            _applicationUserService = _applicationUserfixture.Freeze<Mock<IApplicationUserService>>();
            _roomService = _roomFixture.Freeze<Mock<IReservableRoomService>>();

            _roomController = new ReservableRoomController(_roomService.Object, _applicationUserService.Object);
        }
        [Fact]
        public async Task GetAllReservableRooms_ShouldReturnOkResponse_WhenRoomsFound()
        {
            //Arrange
            var roomMock = _roomFixture.Create<List<ReservableRoom>>();
            _roomService.Setup(x => x.GetAllReservableRooms()).ReturnsAsync(roomMock);
            //Act
            var result = await _roomController.GetAllReservableRooms();
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<ReservableRoom>>>();

        }
        [Fact]
        public async Task CreateRoom_ShouldReturnOkResponse_WhenRoomIsCreated()
        {
            //Arrange
            var roomMock = _roomFixture.Create<ReservableRoom>();
            _roomService.Setup(x => x.CreateRoom(roomMock)).ReturnsAsync(roomMock);
            //Act
            var result = await _roomController.CreateRoom(roomMock);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ReservableRoom>>();
        }
        [Fact]
        public async Task DeleteRoom_ShouldReturnOkResponse_WhenRoomIsDeleted()
        {
            //Arrange
            var roomMock = _roomFixture.Create<ReservableRoom>();
            _roomService.Setup(x => x.DeleteRoom(roomMock)).ReturnsAsync(roomMock);
            //Act
            var result = await _roomController.DeleteRoom(roomMock);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ReservableRoom>>();
        }
        [Fact]
        public async Task UpdateRoom_ShouldReturnOkResponse_WhenRoomIsUpdated()
        {
            //Arrange
            var roomMock = _roomFixture.Create<ReservableRoom>();
            _roomService.Setup(x => x.UpdateRoom(roomMock)).ReturnsAsync(roomMock);
            //Act
            var result = await _roomController.UpdateRoom(roomMock);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ReservableRoom>>();
        }
    }
}
