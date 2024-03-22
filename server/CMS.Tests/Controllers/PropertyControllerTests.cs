using CMS.Api.Controllers;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.PropertySystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;

namespace CMS.Tests.Controllers
{
    public class PropertyControllerTests
    {
        private readonly IFixture _propertyfixture = new Fixture();
        private readonly IFixture _lockerfixture = new Fixture();
        private readonly IFixture _parkingSpotfixture = new Fixture();
        private readonly IFixture _applicationUserfixture = new Fixture();


        private readonly Mock<IPropertyService> _propertyService;
        private readonly Mock<ILockerService> _lockerService;
        private readonly Mock<IParkingSpotService> _parkingSpotService;
        private readonly Mock<IApplicationUserService> _applicationUserService;
        private readonly PropertyController _propertyController;
        public PropertyControllerTests()
        {
            _propertyfixture = new Fixture();
            var fixtures = new List<IFixture> { _propertyfixture, _lockerfixture, _parkingSpotfixture, _applicationUserfixture };
            foreach (var fixture in fixtures)
            {
                fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                    .ForEach(b => fixture.Behaviors.Remove(b));
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            }
            //Mocking the services
            _parkingSpotService = _propertyfixture.Freeze<Mock<IParkingSpotService>>();
            _applicationUserService = _lockerfixture.Freeze<Mock<IApplicationUserService>>();
            _propertyService = _parkingSpotfixture.Freeze<Mock<IPropertyService>>();
            _lockerService = _applicationUserfixture.Freeze<Mock<ILockerService>>();

            //Creating the controller
            _propertyController = new PropertyController(_propertyService.Object, _lockerService.Object, _parkingSpotService.Object, _applicationUserService.Object);
        }

        [Fact]
        public async Task GetAllProperties_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var propertiesMock = _propertyfixture.Create<List<Property>>();
            _propertyService.Setup(x => x.GetAllProperties()).ReturnsAsync(propertiesMock);
            //Act
            var result = await _propertyController.GetAllProperties();
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<Property>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.GetAllProperties(), Times.Once());
        }

        [Fact]
        public async Task GetPropertyById_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var propertyMock = _propertyfixture.Create<Property>();
            _propertyService.Setup(x => x.GetPropertyById(It.IsAny<Guid>())).ReturnsAsync(propertyMock);
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            //Act
            var result = await _propertyController.GetPropertyById(Guid.Parse(id));
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Property>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.GetPropertyById(It.IsAny<Guid>()), Times.Once());
        }
        [Fact]
        public async Task GetAllCondoUnits_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var condoUnitsMock = _propertyfixture.Create<List<CondoUnit>>();
            _propertyService.Setup(x => x.GetAllCondoUnits(It.IsAny<Guid>())).ReturnsAsync(condoUnitsMock);
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            //Act
            var result = await _propertyController.GetAllCondoUnits(Guid.Parse(id));
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<CondoUnit>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.GetAllCondoUnits(It.IsAny<Guid>()), Times.Once());
        }
       
        [Fact] 
        public async Task GetAllCondoUnits_ShouldReturnNotFound_WhenDataNotFound()
        {
            //Arrange
            List<CondoUnit> condoUnitsMock = null;
            Guid id = Guid.Parse("5ebdb005-e871-44d4-8e36-b2f15d3cf057");
            _propertyService.Setup(x => x.GetAllCondoUnits(id)).ReturnsAsync(condoUnitsMock);
            
            //Act
            var response = await _propertyController.GetAllCondoUnits(id);
            //Assert
            response.Should().NotBeNull();
            response.Result.Should().BeAssignableTo<NotFoundResult>();
            _propertyService.Verify(x => x.GetAllCondoUnits(id), Times.Once());
        }

        [Fact]
        public async Task CreateProperty_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var propertyMock = _propertyfixture.Create<Property>();
            _propertyService.Setup(x => x.CreateProperty(It.IsAny<Property>())).ReturnsAsync(propertyMock);
            //Act
            var result = await _propertyController.CreateProperty(propertyMock);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Property>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.CreateProperty(It.IsAny<Property>()), Times.Once());
        }

        
        [Fact]
        public async Task UpdateProperty_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var propertyMock = _propertyfixture.Create<Property>();
            _propertyService.Setup(x => x.UpdateProperty(It.IsAny<Property>())).ReturnsAsync(propertyMock);
            _parkingSpotService.Setup(x => x.CreateParkingSpot(It.IsAny<ParkingSpot>())).ReturnsAsync(new ParkingSpot());
            _lockerService.Setup(x => x.CreateLocker(It.IsAny<Locker>())).ReturnsAsync(new Locker());
            _propertyService.Setup(x => x.GetPropertyById(It.IsAny<Guid>())).ReturnsAsync(propertyMock);    
            // Act
            var result = await _propertyController.UpdateProperty(propertyMock);
            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Property>>();
            _propertyService.Verify(x => x.UpdateProperty(It.IsAny<Property>()), Times.Once());

        }




        [Fact]
        public async Task AssociateCondoUnitWithProperty_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var condoUnitMock = _propertyfixture.Create<CondoUnit>();
            _propertyService.Setup(x => x.AssociateCondoUnitWithProperty(It.IsAny<Guid>(), It.IsAny<Guid>())).ReturnsAsync(condoUnitMock);
            string propertyId = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            string condoUnitId = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            //Act
            var result = await _propertyController.AssociateCondoUnitWithProperty(Guid.Parse(propertyId), Guid.Parse(condoUnitId));
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<CondoUnit>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.AssociateCondoUnitWithProperty(It.IsAny<Guid>(), It.IsAny<Guid>()), Times.Once());
        }
        
        [Fact]
        public async Task AssociateCondoUnitWithProperty_ShouldReturnNotFound_WhenDataNotFound()
        {
            //Arrange
            CondoUnit condoUnitMock = null;
            Guid propertyId = Guid.Parse("5ebdb005-e871-44d4-8e36-b2f15d3cf057");
            Guid condoUnitId = Guid.Parse("5ebdb005-e871-44d4-8e36-b2f15d3cf057");
            _propertyService.Setup(x => x.AssociateCondoUnitWithProperty(propertyId, condoUnitId)).ReturnsAsync(condoUnitMock);
            //Act
            var response = await _propertyController.AssociateCondoUnitWithProperty(propertyId, condoUnitId);
            //Assert
            response.Should().NotBeNull();
            response.Result.Should().BeAssignableTo<NotFoundResult>();
            _propertyService.Verify(x => x.AssociateCondoUnitWithProperty(propertyId, condoUnitId), Times.Once());
        }
        [Fact]
        public async Task DeleteProperty_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            _propertyService.Setup(x => x.DeleteProperty(It.IsAny<Guid>())).ReturnsAsync(true);
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            //Act
            var result = await _propertyController.DeleteProperty(Guid.Parse(id));
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<bool>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.DeleteProperty(It.IsAny<Guid>()), Times.Once());
        }
        [Fact]
        public async Task UploadFile_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            _propertyService.Setup(x => x.WriteFile(It.IsAny<Guid>(), It.IsAny<IFormFile>())).ReturnsAsync("File uploaded successfully");
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            IFormFile file = new FormFile(new MemoryStream(), 0, 0, "Data", "file.txt");
            //Act
            var result = await _propertyController.UploadFile(Guid.Parse(id), file);
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<string>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.WriteFile(It.IsAny<Guid>(), It.IsAny<IFormFile>()), Times.Once());
        }
        [Fact]
        public async Task UploadFile_ShouldReturnBadRequest_WhenBadInput()
        {
            // Arrange
            _propertyService.Setup(x => x.WriteFile(It.IsAny<Guid>(), null))
                            .ThrowsAsync(new ArgumentException("File must not be null")); 
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            IFormFile file = null; // Bad input

            // Act
            var result = await _propertyController.UploadFile(Guid.Parse(id), file);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<BadRequestObjectResult>();
            _propertyService.Verify(x => x.WriteFile(It.IsAny<Guid>(), null), Times.Once()); 
        }
        [Fact]
        public async Task DownloadFile_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var expectedFilePath = "..\\..\\..\\FilesForTesting\\PropertyControllerTestFile.txt"; 
            _propertyService.Setup(x => x.DownloadFile(It.IsAny<Guid>(), It.IsAny<string>())).ReturnsAsync(expectedFilePath);
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";
            string fileName = "PropertyControllerTestFile.txt";

            // Act
            var result = await _propertyController.DownloadFile(Guid.Parse(id), fileName);

            // Assert
            Assert.NotNull(result);
            var fileResult = Assert.IsType<FileContentResult>(result);
            Assert.NotNull(fileResult.FileContents);
            Assert.Equal("text/plain", fileResult.ContentType);

            _propertyService.Verify(x => x.DownloadFile(It.IsAny<Guid>(), It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task GetAllFileNames_ShouldReturnOkResponse_WhenDataFound()
        {
            // Arrange
            var fileNamesMock = _propertyfixture.Create<List<string>>();
            _propertyService.Setup(x => x.GetAllFileNames(It.IsAny<Guid>())).ReturnsAsync(fileNamesMock);
            string id = "5ebdb005-e871-44d4-8e36-b2f15d3cf067";

            // Act
            var result = await _propertyController.GetAllFileNames(Guid.Parse(id));

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<string>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _propertyService.Verify(x => x.GetAllFileNames(It.IsAny<Guid>()), Times.Once());
        }
       
        [Fact]
        public async Task GetAllFileNames_ShouldReturnNotFound_WhenDataNotFound()
        {
            // Arrange
            List<string> fileNamesMock = null;
            Guid id = _propertyfixture.Create<Guid>();
            _propertyService.Setup(x => x.GetAllFileNames(id)).ReturnsAsync(fileNamesMock);

            // Act
            var result = await _propertyController.GetAllFileNames(id);

            // Assert
            result.Should().NotBeNull();
            result.Result.Should().BeAssignableTo<NotFoundObjectResult>();
            _propertyService.Verify(x => x.GetAllFileNames(id), Times.Once());
        }

    }
}
