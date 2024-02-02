using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.UserSystem.Entities;
public class RentalUser : ApplicationUser
{
    public RentalUser(string fName, string lName, string email, string password, string phoneNumber)
        : base(fName, lName, email, password, phoneNumber)
    {
    }
}
