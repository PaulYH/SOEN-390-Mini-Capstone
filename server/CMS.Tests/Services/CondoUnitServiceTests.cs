using CMS.Api.Controllers;
using CMS.Api.PropertySystem.Services;
using CMS.Api.PropertySystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;

namespace CMS.Tests.Services
{
    public class CondoUnitServiceTests : CondoUnitServiceTestBase
    {
        private readonly Mock<IApplicationUserService> _applicationUserService;
        private readonly Mock<IPropertyService> _propertyService;
        private readonly Mock<UserManager<ApplicationUser>> _userManager;
        private readonly CondoUnitService _condoUnitService;

        public CondoUnitServiceTests()
        {
            var store = new Mock<IUserStore<ApplicationUser>>();

            _applicationUserService = new Mock<IApplicationUserService>();  
            _propertyService = new Mock<IPropertyService>();    
            _userManager = new Mock<UserManager<ApplicationUser>>(store.Object, null, null, null, null, null, null, null, null);
            _condoUnitService = new CondoUnitService(_context, _userManager.Object);
        }

        [Fact]
        public async Task CreateCondoUnit_ShouldReturnCondoUnit_WhenDataFound()
        {
            //Arrange
            var condoUnit = new CondoUnit()
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 1,
                RegistrationKey = Guid.NewGuid(),
                Size = 1,
                FeePerSquareFoot = 1,
                Owner = null,
                Occupant = null
            };
            
            //Act
            var result = await _condoUnitService.CreateCondoUnit(condoUnit);

            //Assert
            result.Should().NotBeNull();
        }



        [Fact]
        public async Task DeleteCondoUnit_ShouldReturnTrue_WhenDataFound()
        {
            //Arrange
            var newCondoUnit = new CondoUnit()
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 1,
                RegistrationKey = Guid.NewGuid(),
                Size = 1,
                FeePerSquareFoot = 1,
                Owner = null,
                Occupant = null
            };

            _context.CondoUnits.Add(newCondoUnit);

            //Act
            var result = await _condoUnitService.DeleteCondoUnit(newCondoUnit.Id);

            //Assert
            Assert.True(result);
        }

        [Fact]
        public async Task DeleteCondoUnit_ShouldReturnFalse_WhenDataNotFound()
        {
            //Arrange
            var condoUnit = new CondoUnit();  //not added in _context.CondoUnits

            //Act
            var result = await _condoUnitService.DeleteCondoUnit(condoUnit.Id);

            //Assert
            Assert.False(result);
        }



        [Fact]
        public async Task GetCondoUnitsByEmail_ShouldReturnCondoUnit_WhenDataFound()
        {
            //Arrange
            var condoUnit = await _condoUnitService.GetCondoUnitsByEmail(_context.CondoUnits.First().Owner.Email);
            
            //Act
            Console.WriteLine(condoUnit.Value);

            //Assert
            condoUnit.Value.Should().NotBeNull();
        }

        [Fact]
        public async Task AssociateCondoUnitWithOwner_ShouldReturnCondoUnit_WhenDataFound()
        {
            //Arrange
            var condoUnit = _context.CondoUnits;

            //Act
            var result = await _condoUnitService.SetUnitOwner(condoUnit.First().Id, _context.CondoUnits.First().Owner.Id);
            
            //Assert
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task AssociateCondoUnitWithOwner_ShouldReturnNull_WhenDataNotFound()
        {
            //Arrange
            var condoUnit = new CondoUnit();  

            //Act
            var result = await _condoUnitService.SetUnitOwner(condoUnit.Id, _context.CondoUnits.First().Owner.Id);

            //Assert
            result.Should().BeNull();
        }

        [Fact]
        public async Task AssociateCondoUnitWithOccupant_ShouldReturnCondoUnit_WhenDataFound()
        {
            //Arrange
            var condoUnit = _context.CondoUnits;

            //Act
            var result = await _condoUnitService.SetUnitOccupant(condoUnit.First().Id, _context.CondoUnits.First().Occupant.Id);
            
            //Assert
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task AssociateCondoUnitWithOccupant_ShouldReturnNull_WhenDataNotFound()
        {
            //Arrange
            var condoUnit = new CondoUnit();

            //Act
            var result = await _condoUnitService.SetUnitOccupant(condoUnit.Id, _context.CondoUnits.First().Occupant.Id);

            //Assert
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetCondoUnitsByOwner_ShouldReturnCondoUnits_WhenDataFound()
        {
            //Arrange
            var condoUnit = await _condoUnitService.GetOwnedCondoUnitsByUser(_context.CondoUnits.First().Owner.Id);
            
            //Act
            Console.WriteLine(condoUnit.Value);
            
            //Assert
            condoUnit.Value.Should().NotBeNull();
        }

        [Fact]
        public async Task GetCondoUnitsByOwner_ShouldReturnNull_WhenDataNotFound()
        {
            var owner = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "User1First",
                LastName = "User1Last",
                Email = "user1@test.com",
                ProfilePicture = null,
                hasRequestedOccupantKey = false,
                hasRequestedOwnerKey = false,
                ParkingSpots = null,
                Lockers = null,
                OwnedCondoUnits = null
            };

            //Act
            var result = await _condoUnitService.GetOccupantCondoUnitByUser(owner.Id);

            //Assert
            result.Should().BeNull();
        }


        [Fact]
        public async Task GetCondoUnitsByOccupant_ShouldReturnCondoUnits_WhenDataFound()
        {
            //Arrange
            var condoUnit = await _condoUnitService.GetOccupantCondoUnitByUser(_context.CondoUnits.First().Occupant.Id);

            //Act
            Console.WriteLine(condoUnit.Value);

            //Assert
            condoUnit.Value.Should().NotBeNull();
        }

        [Fact]
        public async Task GetCondoUnitsByOccupant_ShouldReturnNull_WhenDataNotFound()
        {
            var occupant = new ApplicationUser()
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = "User1First",
                LastName = "User1Last",
                Email = "user1@test.com",
                ProfilePicture = null,
                hasRequestedOwnerKey = false,
                ParkingSpots = null,
                Lockers = null
            };

            //Act
            var result = await _condoUnitService.GetOccupantCondoUnitByUser(occupant.Id);

            //Assert
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetCondoUnitById_ShouldReturnCondoUnit_WhenDataFound()
        {
            //Arrange
            var condoUnit = await _condoUnitService.GetCondoUnitById(_context.CondoUnits.First().Id);

            //Act
            Console.WriteLine(condoUnit.Value);

            //Assert
            condoUnit.Value.Should().NotBeNull();
        }

        [Fact]
        public async Task GetCondoUnitById_ShouldReturnNull_WhenDataNotFound()
        {
            //Arrange
            var condoUnit = new CondoUnit()
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 1,
                RegistrationKey = Guid.NewGuid(),
                Size = 1,
                FeePerSquareFoot = 1,
                Owner = null,
                Occupant = null
            };

            //Act
            var result = await _condoUnitService.GetCondoUnitById(condoUnit.Id);
        
            //Assert
            result.Should().BeNull();
        }

        [Fact]
        public async Task UpdateCondoUnit_ShouldReturnCondoUnit_WhenDataFound()
        {
            //Arrange
            var condoUnit = _context.CondoUnits;
            condoUnit.First().FeePerSquareFoot = 0.5m;

            //Act
            var result = await _condoUnitService.UpdateCondoUnit(condoUnit.First());
            
            //Assert
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task UpdateCondoUnit_ShouldReturnNull_WhenDataNotFound()
        {
            //Arrange
            //Arrange
            var condoUnit = new CondoUnit()
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 1,
                RegistrationKey = Guid.NewGuid(),
                Size = 1,
                FeePerSquareFoot = 1,
                Owner = null,
                Occupant = null
            };

            condoUnit.FeePerSquareFoot = 0.5m;

            //Act
            var result = await _condoUnitService.UpdateCondoUnit(condoUnit);

            //Assert
            result.Should().BeNull();
        }
    }
}
