using Microsoft.AspNetCore.Identity;

namespace CMS.Api.UserSystem.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
    }
}
