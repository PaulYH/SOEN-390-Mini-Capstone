using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.FinancialSystem
{
    public class Payment
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public double Amount { get; set; }
        public ApplicationUser User { get; set; } = null!;
    }
}
