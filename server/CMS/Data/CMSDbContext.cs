using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CMS.Api.Data
{
    public class CMSDbContext : IdentityDbContext<ApplicationUser>
    {
        public CMSDbContext(DbContextOptions<CMSDbContext> options) : base(options)
        {
            
        }
    }
}
