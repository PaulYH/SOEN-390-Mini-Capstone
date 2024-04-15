using CMS.Api.Data;
using CMS.Api.UserSystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using CMS.Api.PropertySystem.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Reflection.Metadata.Ecma335;
using Microsoft.IdentityModel.Tokens;



namespace CMS.Api.PropertySystem.Services
{
    public class CondoUnitService : ICondoUnitService
    {
        private readonly CMSDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public CondoUnitService(CMSDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<ActionResult<CondoUnit>> CreateCondoUnit(CondoUnit condoUnit)
        {
            _context.CondoUnits.Add(condoUnit);
            await _context.SaveChangesAsync();
            return condoUnit;
            
        }

        public async Task<bool> DeleteCondoUnit(Guid id)
        {
            var condoUnit = await _context.CondoUnits.FindAsync(id);

            if (condoUnit == null) { return false; }
            else
            {
                _context.Remove(condoUnit);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<ActionResult<List<CondoUnit>>> GetCondoUnitsByEmail(string email)
        {
            var condos = await _context.CondoUnits
                    .Include(c => c.Owner) 
                    .Include(c => c.Occupant) 
                    .Where(c => c.Owner.Email == email)
                    .ToListAsync();
            return condos;
        }
        
        public async Task<ActionResult<CondoUnit>> SetUnitOwner(Guid unitId, string ownerId)
        {
            var condoUnit = await _context.CondoUnits.FindAsync(unitId);
            if (condoUnit == null)
                return null;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == ownerId);
            if (user == null)
                return null;

            user.hasRequestedOwnerKey = false;
            condoUnit.Owner = user;
            condoUnit.Occupant = user;

            if (user.OwnedCondoUnits == null)
            {
                user.OwnedCondoUnits = new List<CondoUnit>();
            }
            user.OwnedCondoUnits.Add(condoUnit);

            await _context.SaveChangesAsync();

            await _userManager.RemoveFromRoleAsync(user, "Public");
            await _userManager.AddToRoleAsync(user, "Owner");

            return condoUnit;
        }

        public async Task<ActionResult<CondoUnit>> SetUnitOccupant(Guid unitId, string occupantId)
        {
            var condoUnit = await _context.CondoUnits.FindAsync(unitId);
            if (condoUnit == null)
                return null;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == occupantId);
            if (user == null)
                return null;

            user.hasRequestedOccupantKey = false;
            condoUnit.Occupant = user;

            if (user.RentedCondoUnits == null)
            {
                user.RentedCondoUnits = new List<CondoUnit>();
            }
            user.RentedCondoUnits.Add(condoUnit);

            await _context.SaveChangesAsync();

            if (!await _userManager.IsInRoleAsync(user, "Owner"))
            {
                await _userManager.RemoveFromRoleAsync(user, "Public");
                await _userManager.AddToRoleAsync(user, "Renter");
            }

            return condoUnit;
        }

        public async Task<ActionResult<List<CondoUnit>>> GetOwnedCondoUnitsByUser(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return null;
            var condoUnits = await _context.CondoUnits.Where(x => x.Owner == user).ToListAsync();
            if (condoUnits == null) return null;
            return condoUnits;
        }

        public async Task<ActionResult<CondoUnit>> GetOccupantCondoUnitByUser(string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return null;
            var condoUnit = await _context.CondoUnits.FirstOrDefaultAsync(x => x.Occupant == user);
            if (condoUnit == null) return null;
            return condoUnit;
        }

        public async Task<ActionResult<CondoUnit>> GetCondoUnitById(Guid id)
        {
            var condoUnit = await _context.CondoUnits.FirstOrDefaultAsync(c => c.Id == id);

            if (condoUnit == null)
            {
                return null;
            }
            return condoUnit;
        }



        public async Task<ActionResult<CondoUnit>> UpdateCondoUnit(CondoUnit updatedCondoUnit)
        {
            var condo = await _context.CondoUnits.FindAsync(updatedCondoUnit.Id);
            if (condo == null) { return null; }

            condo.ExternalUnitId = updatedCondoUnit.ExternalUnitId != -1 ?
                condo.ExternalUnitId : updatedCondoUnit.ExternalUnitId;
            condo.Size = updatedCondoUnit.Size != -1 ?
                condo.Size : updatedCondoUnit.Size;
            condo.FeePerSquareFoot = updatedCondoUnit.FeePerSquareFoot != -1?
                condo.FeePerSquareFoot : updatedCondoUnit.FeePerSquareFoot;

            await _context.SaveChangesAsync();
            return condo;
        }
    }
}
