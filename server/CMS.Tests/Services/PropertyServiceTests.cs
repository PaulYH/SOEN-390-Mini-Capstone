using CMS.Api.PropertySystem.Services;
using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
namespace CMS.Tests.Services
{
    public class PropertyServiceTests : PropertyServiceTestsBase
    {
       private readonly Mock <ILockerService> _lockerService;
       private readonly Mock <IParkingSpotService> _parkingSpotService;
       private readonly Mock <ICondoUnitService> _condoUnitService;
       private readonly PropertyService _propertyService;
        public PropertyServiceTests()
        {
              _lockerService = new Mock<ILockerService>();
              _parkingSpotService = new Mock<IParkingSpotService>();
              _condoUnitService = new Mock<ICondoUnitService>();
              _propertyService = new PropertyService(_context, _condoUnitService.Object);
         }
        [Fact]
        public async Task GetAllProperties_ShouldReturnNonEmptyPropertyList_WhenDataFound()
        {
            //Arrange
            var result = await _propertyService.GetAllProperties();
            var properties = result.Value;
            //Act
            foreach (var property in properties)
            {
                
               Console.WriteLine(property.PropertyName);
            }
            //Assert
            properties.Should().NotBeNull();
        }
        [Fact]
        public async Task GetPropertyById_ShouldReturnProperty_WhenDataFound()
        {
            //Arrange
            var property = await _propertyService.GetPropertyById(_context.Properties.First().Id);
            //Act
            Console.WriteLine(property.Value.PropertyName);
            //Assert
            property.Value.Should().NotBeNull();
        }

        [Fact]
        public async Task GetAllCondoUnits_ShouldReturnEmptyCondoUnitList_WhenDataNotFound()
        {
            //Arrange
            var property = _context.Properties;
            var result = await _propertyService.GetAllCondoUnits(property.First().Id);
            //Assert
            result.Result.Should().BeNull();
        }
        [Fact]
        public async Task CreateProperty_ShouldReturnProperty_WhenDataFound()
        {
            //Arrange
            var property = new Property()
            {
                Id = Guid.NewGuid(),
                PropertyName = "Property3",
                CompanyName = "Company3",
                Address = "Street3",
                City = "City3",
                CondoUnits = null,
                ParkingSpots = null,
                Lockers = null,
                ReservableRooms = null
            };
            //Act
            var result = await _propertyService.CreateProperty(property);
            //Assert
            result.Should().NotBeNull();
        }
        [Fact]
        public async Task UpdateProperty_ShouldReturnProperty_WhenDataFound()
        {
            //Arrange
            var property = _context.Properties;
            property.First().PropertyName = "Property1Updated";
            //Act
            var result = await _propertyService.UpdateProperty(property.First());
            //Assert
            result.Should().NotBeNull();
        }
        [Fact]
        public async Task UpdateProperty_ShouldReturnProperty_WhenDataNotFound()
        {
            //Arrange
            var property = new Property()
            {
                Id = Guid.NewGuid(),
                PropertyName = "Property4",
                CompanyName = "Company4",
                Address = "Street4",
                City = "City4",
                CondoUnits = null,
                ParkingSpots = null,
                Lockers = null,
                ReservableRooms = null
            };
            //Act
            var result = await _propertyService.UpdateProperty(property);
            //Assert
            result.Should().BeNull();
        }
        [Fact]
        public async Task AssociateCondoUnitWithProperty_ShouldReturnProperty_WhenDataFound()
        {
            //Arrange
            var property = _context.Properties;
            _condoUnitService.Setup(x => x.GetCondoUnitById(It.IsAny<Guid>())).ReturnsAsync(_context.CondoUnits.First());
            //Act
            var result = await _propertyService.AssociateCondoUnitWithProperty(property.First().Id, _context.CondoUnits.First().Id);
            //Assert
            result.Should().NotBeNull();
        }
        [Fact]
        public async Task DeleteProperty_ShouldReturnProperty_WhenDataFound()
        {
            // Arrange
            var newProperty = new Property
            {
                Id = Guid.NewGuid(),
                PropertyName = "Test Property",
                CompanyName = "Test Company",
                Address = "Test Address",
                City = "Test City",
                CondoUnits = null,
                ParkingSpots = null,
                Lockers = null,
                ReservableRooms = null

            };

            _context.Properties.Add(newProperty);
            await _context.SaveChangesAsync();
            // Act
            var result = await _propertyService.DeleteProperty(newProperty.Id);
                        // Assert
            result.Should().NotBeNull();
           
        }
        [Fact]
        public async Task WriteFile_ShouldReturnTrue_WhenDataFound()
        {
           // Arrange 
            var file = new FormFile(new MemoryStream(Encoding.UTF8.GetBytes("This is a test file")), 0, 0, "Data", "test.txt");
            // Act
            var result = await _propertyService.WriteFile(It.IsAny<Guid>(), file);
            // Assert
            result.Should().NotBeNull();
        }
        [Fact]
        public async Task WriteFile_ShouldThrowException_WhenDataNotFound()
        {
            // Arrange
            IFormFile file = null;
            Guid propertyId = Guid.NewGuid(); 

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _propertyService.WriteFile(propertyId, file));
        }
        [Fact]
        public async Task DownloadFile_ShouldReturnFile_WhenDataFound()
        {
            // Arrange
            var property = _context.Properties.First();
            var expectedFilePath = "..\\..\\..\\FilesForTesting\\PropertyControllerTestFile.txt";
            // Act
            var result = await _propertyService.DownloadFile(property.Id,expectedFilePath);
            // Assert
            result.Should().NotBeNull();
        }
        [Fact]
        public async Task GetAllFileNames_ReturnsFileNames_WhenDirectoryExists()
        {
            // Arrange
            var id = Guid.NewGuid();
            var fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), $"Data\\Upload\\{id}");
            Directory.CreateDirectory(fileDirectory);

            
            var expectedFileNames = new List<string> { "test1.txt", "test2.txt" };
            foreach (var fileName in expectedFileNames)
            {
                var filePath = Path.Combine(fileDirectory, fileName);
                using (var fileStream = File.Create(filePath)) { }
                
            }
            // Act
            var actionResult = await _propertyService.GetAllFileNames(id);

            // Assert
            var result = actionResult.Value;
            Assert.NotNull(result);
            Assert.NotEmpty(result);
            foreach (var fileName in expectedFileNames)
            {
                Assert.Contains(fileName, result);
            }

           
            Directory.Delete(fileDirectory, true);
        }
        [Fact]
        public async Task GetAllFileNames_ReturnsNull_WhenDirectoryDoesNotExist()
        {
            // Arrange
            var id = Guid.NewGuid(); 
            
            // Act
            var actionResult = await _propertyService.GetAllFileNames(id);

            // Assert
            actionResult.Should().BeNull();

        }

    }

}
