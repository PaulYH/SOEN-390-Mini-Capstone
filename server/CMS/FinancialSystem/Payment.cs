using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.FinancialSystem
{
    public class Payment
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.Now;
        public ApplicationUser User { get; set; } = null!; // TODO: add role verification
    }
}
