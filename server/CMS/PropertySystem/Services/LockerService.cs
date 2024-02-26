using Microsoft.AspNetCore.Mvc;
using CMS.Api.Data;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;

namespace CMS.Api.PropertySystem.Services
{
    public class LockerService : ILockerService
    {
        private readonly CMSDbContext _context;
        public LockerService(CMSDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<Locker>> CreateLocker(Locker locker)
        {
            _context.Lockers.Add(locker);
            await _context.SaveChangesAsync();
            return locker;
        }

        public async Task<ActionResult<Locker>> UpdateLocker(Locker updatedLocker)
        {
            var locker = await _context.Lockers.FindAsync(updatedLocker.Id);
            if (locker == null) { return null; }

            locker.LockerFee = updatedLocker.LockerFee.Equals(null) ?
                locker.LockerFee : updatedLocker.LockerFee;
            locker.ExternalLockerId = updatedLocker.ExternalLockerId.Equals(null) ?
                locker.ExternalLockerId : updatedLocker.ExternalLockerId;

            locker.Owner = updatedLocker.Owner.Equals(null) ?
                locker.Owner : updatedLocker.Owner;
            await _context.SaveChangesAsync();
            return locker;
        }
    }
}
