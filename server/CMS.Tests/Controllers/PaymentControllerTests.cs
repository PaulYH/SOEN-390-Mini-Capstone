using CMS.Api.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;
using CMS.Api.FinancialSystem.Services;
using CMS.Api.FinancialSystem;
using CMS.Api.PropertySystem.Services;
using CMS.Api.UserSystem.Entities;
using Moq;
namespace CMS.Tests.Controllers
{
    public class PaymentControllerTests
    {
        private readonly IFixture _paymentfixture = new Fixture();
        private readonly IFixture _applicationUserfixture = new Fixture();


        private readonly Mock<IPaymentService> _paymentService;
        private readonly Mock<IApplicationUserService> _applicationUserService;
        private readonly PaymentController _paymentController;

        public PaymentControllerTests()
        {
            _paymentfixture = new Fixture();
            var fixtures = new List<IFixture> { _paymentfixture, _applicationUserfixture };
            foreach (var fixture in fixtures)
            {
                fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                    .ForEach(b => fixture.Behaviors.Remove(b));
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            }
            //Mocking the services
            _applicationUserService = _applicationUserfixture.Freeze<Mock<IApplicationUserService>>();
            _paymentService = _paymentfixture.Freeze<Mock<IPaymentService>>();

            _paymentController = new PaymentController(_paymentService.Object, _applicationUserService.Object);
        }
        [Fact]
        public async Task GetAllPayments_ShouldReturnOkResponse_WhenPaymentsFound()
        {
            //Arrange
            var paymentsMock = _paymentfixture.Create<List<Payment>>();
            _paymentService.Setup(x => x.GetAllPayments()).ReturnsAsync(paymentsMock);
            //Act
            var result = await _paymentController.GetAllPayments();
            //Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<Payment>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _paymentService.Verify(x => x.GetAllPayments(), Times.Once());
        }
        [Fact]
        public async Task CreatePayment_ShouldReturnOkResponse_WhenPaymentIsSuccessfullyCreated()
        {
            // Arrange
            string userId = Guid.NewGuid().ToString();
            var paymentMock = _paymentfixture.Create<Payment>();
            var userMock = _applicationUserfixture.Create<ApplicationUser>();

            var userActionResultMock = new ActionResult<ApplicationUser>(userMock);

            _applicationUserService.Setup(x => x.GetUserById(userId)).ReturnsAsync(userActionResultMock);
            _paymentService.Setup(x => x.CreatePayment(It.IsAny<Payment>(), userId)).ReturnsAsync(paymentMock);

            // Act
            var result = await _paymentController.CreatePayment(paymentMock, userId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<Payment>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _paymentService.Verify(x => x.CreatePayment(It.IsAny<Payment>(),userId), Times.Once());
        }
        [Fact]
        public async Task GetPaymentsOfUser_ShouldReturnOkResponse_WhenPaymentsFound()
        {
            // Arrange
            string userId = Guid.NewGuid().ToString();
            var paymentsMock = _paymentfixture.Create<List<Payment>>();
            

            _paymentService.Setup(x => x.GetPaymentsOfUser(userId)).ReturnsAsync(paymentsMock);

            // Act
            var result = await _paymentController.GetPaymentsOfUser(userId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<List<Payment>>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _paymentService.Verify(x => x.GetPaymentsOfUser(userId), Times.Once());
        }
        [Fact]
        public async Task UpdateUserBalance_ShouldReturnOkResponse_WhenUserIsSuccessfullyUpdated()
        {
            // Arrange
            string userId = Guid.NewGuid().ToString();
            double newBalance = 1000;
            var userMock = _applicationUserfixture.Create<ApplicationUser>();

            var userActionResultMock = new ActionResult<ApplicationUser>(userMock);

            _paymentService.Setup(x => x.UpdateUserBalance(userId, newBalance)).ReturnsAsync(userActionResultMock);

            // Act
            var result = await _paymentController.UpdateUserBalance(userId, newBalance);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<ApplicationUser>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _paymentService.Verify(x => x.UpdateUserBalance(userId, newBalance), Times.Once());
        }
        [Fact]
        public async Task GenerateAndDownloadAnnualReport_ShouldReturnOkResponse_WhenReportIsSuccessfullyGenerated()
        {
            // Arrange
            int year = 2021;
            var reportMock = _paymentfixture.Create<string>();

            _paymentService.Setup(x => x.GenerateAndDownloadAnnualReport(year)).ReturnsAsync(reportMock);

            // Act
            var result = await _paymentController.GenerateAndDownloadAnnualReport(year);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ActionResult<string>>();

            result.Result.As<OkObjectResult>().Value
                .Should()
                .NotBeNull();
            _paymentService.Verify(x => x.GenerateAndDownloadAnnualReport(year), Times.Once());
        }
    }
}
