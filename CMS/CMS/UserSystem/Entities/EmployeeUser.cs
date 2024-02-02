using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Enums;

namespace CMS.UserSystem.Entities;
public class EmployeeUser : ApplicationUser
{
    public EmployeeType EmployeeType { get; set; }
    public PropertyUser Employer { get; set; }

    public EmployeeUser(string fName, string lName, string email, string password, string phoneNumber, PropertyUser employer)
        : base(fName, lName, email, password, phoneNumber)
    {
        Employer = employer;
    }
}
