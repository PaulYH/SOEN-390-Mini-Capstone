using CMS.Api.PropertySystem.Services;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Moq;
using System;
using CMS.Api.Controllers;
using CMS.Api.PropertySystem.Entities;
using Azure;
using static CMS.Api.Controllers.CondoUnitController;

namespace CMS.Tests.Controllers
{
    public class CondoUnitControllerTests
    {
        private readonly IFixture _fixture;
        private readonly Mock<IApplicationUserService> _applicationUserService;
        private readonly Mock<ICondoUnitService> _condoUnitService;
        private readonly CondoUnitController _condoUnitController;

        public CondoUnitControllerTests()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());

            _applicationUserService = _fixture.Freeze<Mock<IApplicationUserService>>();
            _condoUnitService = _fixture.Freeze<Mock<ICondoUnitService>>();

            _condoUnitController = new CondoUnitController(_condoUnitService.Object, _applicationUserService.Object);
        }

        [Fact]
        public async Task GetCondoUnitsByEmail_ShouldReturnOkResponse_WithCondos_WhenDataFound()
        {
            // Arrange
            var condosMock = _fixture.Create<List<CondoUnit>>();
            string email = "test@example.com";
            _condoUnitService.Setup(x => x.GetCondoUnitsByEmail(email)).ReturnsAsync(condosMock);

            // Act
            var actionResult = await _condoUnitController.GetCondoUnitsByEmail(email);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var condoUnits = Assert.IsType<ActionResult<List<CondoUnit>>>(okResult.Value);
            condoUnits.Should().NotBeNull();
            _condoUnitService.Verify(x => x.GetCondoUnitsByEmail(email), Times.Once());
        }



        [Fact]
        public async Task GetCondoUnitsByUser_ShouldReturnOkResponse_WithCondos_WhenDataFound()
        {
            // Arrange
            var condosMock = _fixture.Create<List<CondoUnit>>();
            string id = Guid.NewGuid().ToString();
            _condoUnitService.Setup(x => x.GetOwnedCondoUnitsByUser(id)).ReturnsAsync(condosMock);

            // Act
            var actionResult = await _condoUnitController.GetOwnedCondoUnitsByUser(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var condoUnits = Assert.IsType<ActionResult<List<CondoUnit>>>(okResult.Value);
            condoUnits.Should().NotBeNull();
            _condoUnitService.Verify(x => x.GetOwnedCondoUnitsByUser(id), Times.Once());
        }


        [Fact]
        public async Task GetCondoUnitsByUser_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            ActionResult<List<CondoUnit>> response = null;
            string id = Guid.NewGuid().ToString();
            _condoUnitService.Setup(x => x.GetOwnedCondoUnitsByUser(id)).ReturnsAsync(response);

            // Act
            var result = await _condoUnitController.GetOwnedCondoUnitsByUser(id);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeOfType<NotFoundResult>();
            _condoUnitService.Verify(x => x.GetOwnedCondoUnitsByUser(id), Times.Once());
        }
        
        [Fact] //COMPILER ERROR IDK WHY
        public async Task GetOccupantCondoUnitByUser_ShouldReturnOkResponse_WithCondos_WhenDataFound()
        {
            // Arrange
            var condosMock = _fixture.Create<CondoUnit>();
            string id = Guid.NewGuid().ToString();
            _condoUnitService.Setup(x => x.GetOccupantCondoUnitByUser(id)).ReturnsAsync(condosMock);

            // Act
            var actionResult = await _condoUnitController.GetOccupantCondoUnitByUser(id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var condoUnits = Assert.IsType<ActionResult<CondoUnit>>(okResult.Value);
            condoUnits.Should().NotBeNull();
            _condoUnitService.Verify(x => x.GetOccupantCondoUnitByUser(id), Times.Once());
        }
        
        [Fact]
        public async Task GetOccupantCondoUnitByUser_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            ActionResult<CondoUnit> response = null;
            string id = Guid.NewGuid().ToString();
            _condoUnitService.Setup(x => x.GetOccupantCondoUnitByUser(id)).ReturnsAsync(response);

            // Act
            var result = await _condoUnitController.GetOccupantCondoUnitByUser(id);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeOfType<NotFoundResult>();
            _condoUnitService.Verify(x => x.GetOccupantCondoUnitByUser(id), Times.Once());
        }

        [Fact]
        public async Task CreateCondoUnit_ReturnsOkResult_WithCondoUnit()
        {
            // Arrange
            var request = new CondoUnitDto
            {
                ExternalUnitId = 123,
                Size = 1000,
                FeePerSquareFoot = 1.5m,
                OwnerEmail = "owner@example.com",
                OccupantEmail = "occupant@example.com"
            };

            var sameRequest = new CreateCondoUnitRequest
            {
                ExternalUnitId = request.ExternalUnitId,
                Size = request.Size,
                FeePerSquareFoot = request.FeePerSquareFoot,
            };

            var expectedCondoUnit = new CondoUnit
            {
                ExternalUnitId = request.ExternalUnitId,
                Size = request.Size,
                FeePerSquareFoot = request.FeePerSquareFoot,
                Owner = new ApplicationUser { Email = request.OwnerEmail }, 
                Occupant = new ApplicationUser { Email = request.OccupantEmail }
            };

            _condoUnitService.Setup(s => s.CreateCondoUnit(It.IsAny<CondoUnit>()))
                .ReturnsAsync(expectedCondoUnit);

            // Act
            var result = await _condoUnitController.CreateCondoUnit(sameRequest);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<CondoUnitDto>(actionResult.Value);

            _condoUnitService.Verify(s => s.CreateCondoUnit(It.IsAny<CondoUnit>()), Times.Once);
        }

        [Fact]
        public async Task DeleteCondoUnit_ReturnsTrue_WhenDeletionIsSuccessful()
        {
            // Arrange
            var condoUnitId = Guid.NewGuid();
            _condoUnitService.Setup(s => s.DeleteCondoUnit(condoUnitId))
                .ReturnsAsync(true);

            // Act
            var result = await _condoUnitController.DeleteCondoUnit(condoUnitId);

            // Assert
            Assert.True(result);
            _condoUnitService.Verify(s => s.DeleteCondoUnit(condoUnitId), Times.Once);
        }

        [Fact]
        public async Task DeleteCondoUnit_ReturnsFalse_WhenDeletionFails()
        {
            // Arrange
            var condoUnitId = Guid.NewGuid();
            _condoUnitService.Setup(s => s.DeleteCondoUnit(condoUnitId))
                .ReturnsAsync(false);

            // Act
            var result = await _condoUnitController.DeleteCondoUnit(condoUnitId);

            // Assert
            Assert.False(result);
            _condoUnitService.Verify(s => s.DeleteCondoUnit(condoUnitId), Times.Once);
        }

        [Fact]
        public async Task SetUnitOwner_ReturnsOk_WhenCondoUnitIsFound()
        {
            // Arrange
            Guid condoId = Guid.NewGuid();
            string ownerId = "testOwnerId";
            var condoUnit = new CondoUnit
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 123,
                RegistrationKey = Guid.NewGuid(),
                Size = 1000,
                FeePerSquareFoot = 2.5m,
                Owner = new ApplicationUser
                {
                    Id = "testOwnerId"
                },
                Occupant = new ApplicationUser
                {
                    Id = condoId.ToString()
                }
            };

            _condoUnitService.Setup(s => s.SetUnitOwner(condoId, ownerId))
                .ReturnsAsync(condoUnit);

            // Act
            var result = await _condoUnitController.SetUnitOwner(condoId, ownerId);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsType<ActionResult<CondoUnit>>(actionResult.Value);
            _condoUnitService.Verify(s => s.SetUnitOwner(condoId, ownerId), Times.Once);
        }

        [Fact]
        public async Task UpdateCondoUnit_ReturnsOk_WithValidCondoUnit()
        {
            // Arrange
            var updatedCondoUnit = new CondoUnit
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 123,
                RegistrationKey = Guid.NewGuid(),
                Size = 1000,
                FeePerSquareFoot = 2.5m,
                Owner = new ApplicationUser { Id = "ownerId" },
                Occupant = new ApplicationUser { Id = "occupantId" }
            };

            _condoUnitService.Setup(s => s.UpdateCondoUnit(It.IsAny<CondoUnit>()))
                .ReturnsAsync(updatedCondoUnit);

            // Act
            var result = await _condoUnitController.UpdateCondoUnit(updatedCondoUnit);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<ActionResult<CondoUnit>>(actionResult.Value);
        }

        [Fact]
        public async Task SetUnitOccupant_ReturnsOk_WhenCondoUnitIsFound()
        {
            // Arrange
            Guid condoId = Guid.NewGuid();
            string ownerId = "testOwnerId";
            var condoUnit = new CondoUnit
            {
                Id = Guid.NewGuid(),
                ExternalUnitId = 123,
                RegistrationKey = Guid.NewGuid(),
                Size = 1000,
                FeePerSquareFoot = 2.5m,
                Owner = new ApplicationUser
                {
                    Id = "testOwnerId"
                },
                Occupant = new ApplicationUser
                {
                    Id = condoId.ToString()
                }
            };

            _condoUnitService.Setup(s => s.SetUnitOccupant(condoId, ownerId))
                .ReturnsAsync(condoUnit);

            // Act
            var result = await _condoUnitController.SetUnitOccupant(condoId, ownerId);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.IsType<ActionResult<CondoUnit>>(actionResult.Value);
            _condoUnitService.Verify(s => s.SetUnitOccupant(condoId, ownerId), Times.Once);
        }
        
        
    }

}




