using Microsoft.AspNetCore.Mvc;
using CMS.Api.FinancialSystem;
using CMS.Api.UserSystem.Entities;
namespace CMS.Api.FinancialSystem.Services
{
    public interface IPaymentService
    {
        Task<ActionResult<List<Payment>>> GetAllPayments();
        Task<ActionResult<Payment>> CreatePayment(Payment payment, string userId);
        Task<ActionResult<List<Payment>>> GetPaymentsOfUser(string userId);
        Task<ActionResult<ApplicationUser>> UpdateUserBalance(string userId, double updatedBalance);
        Task<ActionResult<double>> GetUserBalance(string userId);
        Task<ActionResult<string>> GenerateAndDownloadAnnualReport(int year);
    }
}
