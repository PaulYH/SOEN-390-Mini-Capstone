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
    public class ReservationServiceTests : ReservationServiceTestsBase
    {
        private readonly IReservationService _reservationService;
        public ReservationServiceTests() 
        {
            _reservationService = new ReservationService(_context);
        }

        [Fact]
        public async Task CreateReservation_ShouldReturnReservation_WhenDataFound()
        {
            //Arrange
            var reservation = new Reservation()
            {
                ReservedBy = _context.Users.First()
            };

            //Act
            var result = await _reservationService.CreateReservation(reservation);

            //Assert
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task DeleteReservation_ShouldReturnDeletedReservation_WhenDataFound()
        {
            //Arrange
            var reservation = _context.Reservations.First();
            var reservationCount = _context.Reservations.Count();

            //Act
            var result = await _reservationService.DeleteReservation(reservation);

            //Assert
            result.Should().NotBeNull();
            _context.Reservations.Count().Should().Be(reservationCount - 1);
        }

        [Fact]
        public async Task GetAllReservations_ShouldReturnReservationList_WhenDataFound()
        {
            //Arrange
            var count = _context.Reservations.Count();

            //Act
            var result = await _reservationService.GetAllReservations();

            //Assert
            result.Should().NotBeNull();
            result.Value.Count().Should().Be(count);
        }
        [Fact]
        public async Task GetAllReservationsByUserId_ShouldReturnReservationList_WhenDataFound()
        {
            //Arrange
            var user = _context.Users.First();

            //Act
            var result = await _reservationService.GetAllReservationsByUserId(user.Id);

            //Assert
            result.Should().NotBeNull();
            result.Value.Count().Should().Be(4);
        }
    }
}
