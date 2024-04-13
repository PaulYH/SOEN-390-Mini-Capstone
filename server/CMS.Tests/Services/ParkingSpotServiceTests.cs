using CMS.Api.PropertySystem.Services;
using CMS.Api.PropertySystem.Entities;

using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using CMS.Tests.Services.TestBases;
namespace CMS.Tests.Services
{
    public class ParkingSpotServiceTests : ParkingSpotServiceTestsBase
    {
        private readonly IParkingSpotService _lockerService;

        public ParkingSpotServiceTests()
        {
            _lockerService = new ParkingSpotService(_context);
        }

        [Fact]
        public async Task CreateParkingSpot_ShouldReturnParkingSpot_WhenDataFound()
        {
            //_lockerService.Setup(x => x.CreateParkingSpot(It.IsAny<ParkingSpot>())).ReturnsAsync(_context.ParkingSpots.First());

            // Arrange
            var locker = new ParkingSpot()
            {
                ExternalSpotId = 1,
                SpotFee = 1,
                PropertyId = Guid.NewGuid(),
                Property = new Property(),
                OwnerId = Guid.NewGuid().ToString(),
                Owner = new ApplicationUser()
            };

            var result = await _lockerService.CreateParkingSpot(locker);

            result.Should().NotBeNull();
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnParkingSpot_WhenDataFound()
        {
            var locker = _context.ParkingSpots.First();
            locker.SpotFee = 1000;
            var result = await _lockerService.UpdateParkingSpot(locker);

            result.Should().NotBeNull();
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnNull_WhenNullParkingSpotId()
        {
            var locker = new ParkingSpot()
            {
                ExternalSpotId = 1,
                SpotFee = 1,
                PropertyId = Guid.NewGuid(),
                Property = new Property(),
                OwnerId = Guid.NewGuid().ToString(),
                Owner = new ApplicationUser()
            };

            var result = await _lockerService.UpdateParkingSpot(locker);

            result.Should().BeNull();
        }

        [Fact]
        public async Task UpdateParkingSpot_ShouldReturnNull_WhenNullAttributes()
        {
            var locker2 = new ParkingSpot() {};

            var result = await _lockerService.UpdateParkingSpot(locker2);

            result.Should().BeNull();
        }
    }
}
