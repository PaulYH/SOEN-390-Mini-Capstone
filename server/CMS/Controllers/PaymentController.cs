
using Microsoft.AspNetCore.Mvc;
using CMS.Api.PropertySystem.Services;
using CMS.Api.FinancialSystem;
using CMS.Api.UserSystem.Services;
using CMS.Api.FinancialSystem.Services;
using CMS.Api.UserSystem.Entities;

namespace CMS.Api.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IApplicationUserService _applicationUserService;
        private readonly IPropertyService _propertyService;
        private readonly ICondoUnitService _condoUnitService;
        private readonly IParkingSpotService _parkingSpotService;
        private readonly ILockerService _lockerService;

        public PaymentController(IPaymentService paymentService, IApplicationUserService applicationUserService,
                       IPropertyService propertyService, ICondoUnitService condoUnitService, IParkingSpotService parkingSpotService,
                                  ILockerService lockerService)
        {
            _paymentService = paymentService;
            _applicationUserService = applicationUserService;
            _propertyService = propertyService;
            _condoUnitService = condoUnitService;
            _parkingSpotService = parkingSpotService;
            _lockerService = lockerService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Payment>>> GetAllPayments()
        {
            var payments = await _paymentService.GetAllPayments();
            return Ok(payments);
        }
        [HttpPost("{userId}")]//get back and change the timing
        public async Task<ActionResult<Payment>> CreatePayment(Payment request, string userId)
        {
            Payment payment = new Payment();
            payment.Amount = request.Amount; 
            ActionResult<ApplicationUser> result = await _applicationUserService.GetUserById(userId);
                if (result.Value == null) return NotFound("User Not Found!");
            payment.User = result.Value;
            var createdPayment = await _paymentService.CreatePayment(payment, userId);
            return Ok(createdPayment);
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Payment>>> GetPaymentsOfUser(string userId)
        {
            var payments = await _paymentService.GetPaymentsOfUser(userId);
            if (payments.Value == null) return NotFound();
            return Ok(payments);
        }
        [HttpPut]
        public async Task<ActionResult<ApplicationUser>> UpdateUserBalance(string userId, double updatedBalance)
        {
            var user = await _paymentService.UpdateUserBalance(userId, updatedBalance);
            if (user.Value == null) return NotFound();
            return Ok(user);
        }
        [HttpGet("/balance/{userId}")]
        public async Task<ActionResult<double>> GetUserBalance(string userId)
        {
            var balance = await _paymentService.GetUserBalance(userId);
            if (balance.Value == 0) return NotFound();
            return Ok(balance);
        }
        [HttpGet("/report/{year}")]
        public async Task<ActionResult<string>> GenerateAndDownloadAnnualReport(int year)
        {
            var report = await _paymentService.GenerateAndDownloadAnnualReport(year);
            if (report.Value == null) return NotFound();
            return Ok(report);
        }
    }
}
