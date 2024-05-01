using CMS.Api.Controllers;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.PropertySystem.Services;
using Microsoft.AspNetCore.Mvc;


namespace CMS.Tests.Controllers
{
    public class ReservationControllerTests
    {
        private readonly IFixture _reservationFixture = new Fixture();
        private readonly IFixture _applicationUserfixture = new Fixture();


        private readonly Mock<IReservationService> _reservationService;
        private readonly Mock<IApplicationUserService> _applicationUserService;
        private readonly ReservationController _reservationController;

        public ReservationControllerTests()
        {
            _reservationFixture = new Fixture();
            var fixtures = new List<IFixture> { _reservationFixture, _applicationUserfixture };
            foreach (var fixture in fixtures)
            {
                fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                    .ForEach(b => fixture.Behaviors.Remove(b));
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            }
            //Mocking the services
            _applicationUserService = _applicationUserfixture.Freeze<Mock<IApplicationUserService>>();
            _reservationService = _reservationFixture.Freeze<Mock<IReservationService>>();

            _reservationController = new ReservationController(_reservationService.Object, _applicationUserService.Object);
        }
        [Fact]
        public async Task GetAllReservations_ShouldReturnOkResponse_WhenReservationsFound()
        {
            //Arrange
            var reservationMock = _reservationFixture.Create<List<Reservation>>();
            _reservationService.Setup(x => x.GetAllReservations()).ReturnsAsync(reservationMock);
            //Act
            var result = await _reservationController.GetAllReservations();
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<Reservation>>>();

        }
        [Fact]
        public async Task CreateReservation_ShouldReturnOkResponse_WhenReservationIsCreated()
        {
            //Arrange
            var reservationMock = _reservationFixture.Create<Reservation>();
            _reservationService.Setup(x => x.CreateReservation(reservationMock)).ReturnsAsync(reservationMock);
            //Act
            var result = await _reservationController.CreateReservation(reservationMock);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Reservation>>();
        }
        [Fact]
        public async Task GetAllReservationsByUserId_ShouldReturnOkResponse_WhenReservationsFound()
        {
            //Arrange
            var reservationMock = _reservationFixture.Create<List<Reservation>>();
            _reservationService.Setup(x => x.GetAllReservationsByUserId(It.IsAny<string>())).ReturnsAsync(reservationMock);
            //Act
            var result = await _reservationController.GetAllReservationsByUserId(It.IsAny<string>());
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Reservation>>();

        }
        [Fact]
        public async Task DeleteReservation_ShouldReturnOkResponse_WhenReservationIsDeleted()
        {
            //Arrange
            var reservationMock = _reservationFixture.Create<Reservation>();
            _reservationService.Setup(x => x.DeleteReservation(reservationMock)).ReturnsAsync(reservationMock);
            //Act
            var result = await _reservationController.DeleteReservation(reservationMock);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Reservation>>();
        }

    }
}
