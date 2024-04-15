using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using CMS.Api.FinancialSystem;
using CMS.Api.FinancialSystem.Services;
using CMS.Tests.Services.TestBases;
using CMS.Api;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CMS.Tests.Services
{
    public class PaymentServiceTests : PaymentServiceTestsBase
    {
        private readonly Mock <IApplicationUserService> _userService;
        private readonly Mock <ISystemTime> _systemTime;
        private readonly PaymentService _paymentService;
         public PaymentServiceTests()
        {
               _userService = new Mock<IApplicationUserService>();
              
               _systemTime = new Mock<ISystemTime>();
               _paymentService = new PaymentService(_context, _systemTime.Object);
        }
        [Fact]
        public async Task GetAllPayments_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var result = await _paymentService.GetAllPayments();
            var payments = result.Value;
            //Act
            foreach (var payment in payments)
            {
                
               Console.WriteLine(payment.TransactionDate);
            }
            //Assert
            payments.Should().NotBeNull();
        }
        [Fact]
        public async Task CreatePayment_ShouldReturnPayment_WhenDataFound()
        {
            //Arrange
            var user =

              new ApplicationUser()
              {
                  Id = Guid.NewGuid().ToString(),
                  FirstName = "User1First",
                  LastName = "User1Last",
                  Email = "user1@test.com",
                  ProfilePicture = new ProfilePicture(),
                  hasRequestedOccupantKey = false,
                  hasRequestedOwnerKey = false,
                  ParkingSpots = null,
                  Lockers = null,
                  OwnedCondoUnits = null,
                  RentedCondoUnits = null
              };
            var payment = new Payment()
            {
                Id = Guid.NewGuid(),
                TransactionDate = DateTime.Now,
                Amount = 1,
                User = user
            };
           
            var userId = _context.Users.First().Id;
            var result = await _paymentService.CreatePayment(payment, userId);
            //Act
            Console.WriteLine(result.Value.TransactionDate);
            //Assert
            result.Value.Should().NotBeNull();
        }
        [Fact]
        public async Task GetPaymentsOfUser_ShouldReturnPaymentList_WhenDataFound()
        {
            //Arrange
            var userId = _context.Users.First().Id;
            var result = await _paymentService.GetPaymentsOfUser(userId);
            var payments = result.Value;

            //Assert
            payments.Should().NotBeNull();
        }
        [Fact]
        public async Task UpdateUserBalance_ShouldReturnUser_WhenDataFound()
        {
            //Arrange
            var userId = _context.Users.First().Id;
            var updatedBalance = 100;
            //Act
            var result = await _paymentService.UpdateUserBalance(userId, updatedBalance);
            //Assert
            result.Value.Should().NotBeNull();
        }
        [Fact]
        public async Task GenerateAndDownloadAnnualReport_ShouldReturnBadResponse_WhenDataNotFound()
        {
            //Arrange
            var year = 2021;
            //Act
            var result = await _paymentService.GenerateAndDownloadAnnualReport(year);
            //Assert
            result.Value.Should().BeNull();
        }
        [Fact]
        public async Task GenerateAndDownloadAnnualReport_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var year = 2024;
            //Act
            var result = await _paymentService.GenerateAndDownloadAnnualReport(year);
            //Assert
            result.Should().NotBeNull();
            
            result.Result.Should().BeOfType<OkObjectResult>(); // This checks that the action result is OkObjectResult

            var okResult = result.Result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.IsType<string>(okResult.Value); // Ensures the value is a string (file path)
            Assert.True(File.Exists(okResult.Value.ToString())); // Optionally check if file actually exists
        }

    }
}
