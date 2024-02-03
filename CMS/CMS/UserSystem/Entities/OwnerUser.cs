using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.UserSystem.Entities;
public class OwnerUser : ApplicationUser
{
    public OwnerUser(string fName, string lName, string email, string password, string phoneNumber)
        : base(fName, lName, email, password, phoneNumber)
    {
    }
}
