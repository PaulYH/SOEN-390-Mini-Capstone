using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;

namespace CMS.UserSystem.Entities;
public class ApplicationUser : IdentityUser
{
    public string FirstName {  get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public Picture ProfilePicture { get; set; } = null!;
    public ICollection<CondoUnit>? CondoUnits { get; set; }
}
