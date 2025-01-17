﻿using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Api.UserSystem.Entities
{
    public class ApplicationUser : IdentityUser
    {
        // Used by all users
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public ProfilePicture? ProfilePicture { get; set; }
        public Property? Property { get; set; }

        // Used by Owners & Renters
        public bool? hasRequestedOccupantKey { get; set; } = false;
        public double? Balance { get; set; } = 0;

        [InverseProperty("Owner")]
        public ICollection<ParkingSpot>? ParkingSpots { get; set; }
        
        [InverseProperty("Owner")]
        public ICollection<Locker>? Lockers { get; set; }

        // Used by Owners
        public bool? hasRequestedOwnerKey { get; set; } = false;

        [InverseProperty("Owner")]
        public ICollection<CondoUnit>? OwnedCondoUnits { get; set; }

        // Used by Renters
        [InverseProperty("Occupant")]
        public ICollection<CondoUnit>? RentedCondoUnits { get; set; }
    }
}
