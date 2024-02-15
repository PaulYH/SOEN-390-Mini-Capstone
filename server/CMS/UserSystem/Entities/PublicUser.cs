using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Api.UserSystem.Entities
{
    public class PublicUser : IdentityUser
    {
        // Used by all users
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public ProfilePicture? ProfilePicture { get; set; }
        public ICollection<ParkingSpot>? ParkingSpots { get; set; }
        public ICollection<Locker>? Lockers { get; set; }

        // Used by Owners
        [InverseProperty("Owner")]
        public ICollection<CondoUnit>? OwnedCondoUnits { get; set; }

        // Used by Renters
        [InverseProperty("Occupant")]
        public ICollection<CondoUnit>? RentedCondoUnits { get; set; }

        // Used by Employees
        public PublicUser Employer { get; set; } = null!; // TODO: add role verification
    }
}
