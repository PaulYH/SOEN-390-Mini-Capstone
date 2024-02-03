using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Entities;

namespace CMS.FinancialSystem.Entities;
public class Payment
{
    [Key]
    public Guid Id { get; set; }
    public DateTime TransactionDate { get; set; } = DateTime.Now;
    public ApplicationUser User { get; set; } = null!;
}
