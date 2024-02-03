using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;

namespace CMS.UserSystem.Entities;
public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName {  get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public Picture? ProfilePicture { get; set; }
    public List<CondoUnit> CondoUnits { get; set; } = new List<CondoUnit>();

    public ApplicationUser(string fName, string lName, string email, string password, string phoneNumber) 
    {
        FirstName = fName;
        LastName = lName;
        Email = email;
        Password = password;
        PhoneNumber = phoneNumber;
    }
}
