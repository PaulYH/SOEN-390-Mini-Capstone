using CMS.Api.Data;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text;

namespace CMS.Api.FinancialSystem.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly CMSDbContext _context;
        // include different services if needed later HERE

        public PaymentService(CMSDbContext context)
        {
            _context = context;
        }
        // Gets All Payment Objects in the database
        public async Task<ActionResult<List<Payment>>> GetAllPayments()
        {
            var payments = await _context.Payments.ToListAsync();
            return payments;
        }
        // Create a new Payment Object and associate it simultaneously
        public async Task<ActionResult<Payment>> CreatePayment(Payment payment,string userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) { return null; }
            payment.User = user;
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }
        // Get all payments for a specific user
        public async Task<ActionResult<List<Payment>>> GetPaymentsOfUser(string userId)
        {
            var payments = await _context.Payments
                .Where(x => x.User.Id == userId)
                .ToListAsync();
            return payments;
        }
        // Update balance of cuurent user 
        public async Task<ActionResult<ApplicationUser>> UpdateUserBalance(string userId, double updatedBalance)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return null;
            }
            user.Balance = updatedBalance;
            await _context.SaveChangesAsync();
            return user;
        }
        // Get balance of current user
        public async Task<ActionResult<double>> GetUserBalance(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return null;
            }
            return user.Balance ?? 0;
        }
        // Generate an Annual Report CSV file for all payments of a company in a year
        public async Task<ActionResult<string>> GenerateAndDownloadAnnualReport(int year)
        {
            // Define the path where the file will be saved
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), $"AnnualReport_{year}.csv");

            // Query for payments in the given year
            var payments = await _context.Payments
                .Include(p => p.User) // Make sure to include the User to access user details
                .Where(p => p.TransactionDate.Year == year)
                .ToListAsync();

            // Check if payments exist
            if (payments == null || !payments.Any())
            {
                return new NotFoundObjectResult("No payments found for the specified year.");
            }

            // Create the CSV file and write data
            var csv = new StringBuilder();

            // Write the header of the CSV file
            csv.AppendLine("Date,User,Amount");

            // Write the data of each payment
            foreach (var payment in payments)
            {
                // Format the date as a string
                var date = payment.TransactionDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
                var user = payment.User.FirstName; // Assuming the User has a Name property
                var amount = payment.Amount.ToString(CultureInfo.InvariantCulture);

                // Write the CSV line
                csv.AppendLine($"{date},{user},{amount}");
            }

            // Write to file
            await File.WriteAllTextAsync(filePath, csv.ToString());

            return new OkObjectResult(filePath);
        }
    }
}
