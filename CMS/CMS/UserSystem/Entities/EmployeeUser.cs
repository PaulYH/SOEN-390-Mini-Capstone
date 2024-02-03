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
    public PropertyUser Employer { get; set; } = null!;

}
