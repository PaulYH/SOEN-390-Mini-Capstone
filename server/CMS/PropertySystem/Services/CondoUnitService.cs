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



namespace CMS.Api.PropertySystem.Services
{
    public class CondoUnitService : ICondoUnitService
    {
        private readonly CMSDbContext _context;

        public CondoUnitService(CMSDbContext context)
        {
            _context = context;
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
                .Include(c => c.Id)
                .Include(c => c.Owner)
                .Include(c => c.ExternalUnitId)
                .Include(c => c.Occupant)
                .Where(c => c.Owner.Email == email)
                .ToListAsync();
            return condos;
        }
    }
}
