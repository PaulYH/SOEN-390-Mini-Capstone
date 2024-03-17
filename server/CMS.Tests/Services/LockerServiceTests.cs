using CMS.Api.PropertySystem.Services;
using CMS.Api.PropertySystem.Entities;

using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
namespace CMS.Tests.Services
{
    public class LockerServiceTests : LockerServiceTestsBase
    {
        private readonly ILockerService _lockerService;

        public LockerServiceTests()
        {
            _lockerService = new LockerService(_context);
        }

        [Fact]
        public async Task CreateLocker_ShouldReturnLocker_WhenDataFound()
        {
            //_lockerService.Setup(x => x.CreateLocker(It.IsAny<Locker>())).ReturnsAsync(_context.Lockers.First());

            // Arrange
            var locker = new Locker()
            {
                ExternalLockerId = 1,
                LockerFee = 1,
                PropertyId = Guid.NewGuid(),
                Property = new Property(),
                OwnerId = Guid.NewGuid().ToString(),
                Owner = new ApplicationUser()
            };

            var result = await _lockerService.CreateLocker(locker);

            result.Should().NotBeNull();
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnLocker_WhenDataFound()
        {
            var locker = _context.Lockers.First();
            locker.LockerFee = 1000;
            var result = await _lockerService.UpdateLocker(locker);

            result.Should().NotBeNull();
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnNull_WhenNullLockerId()
        {
            var locker = new Locker()
            {
                ExternalLockerId = 1,
                LockerFee = 1,
                PropertyId = Guid.NewGuid(),
                Property = new Property(),
                OwnerId = Guid.NewGuid().ToString(),
                Owner = new ApplicationUser()
            };

            var result = await _lockerService.UpdateLocker(locker);

            result.Should().BeNull();
        }

        [Fact]
        public async Task UpdateLocker_ShouldReturnNull_WhenNullAttributes()
        {
            var locker = _context.Lockers.First();
            var locker2 = new Locker() { Id = locker.Id};

            var result = await _lockerService.UpdateLocker(locker2);

            result.Should().BeNull();
        }
    }
}
