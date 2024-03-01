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
    public class PropertyService : IPropertyService
    {
        private readonly CMSDbContext _context;
        public PropertyService(CMSDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<List<Property>>> GetAllProperties()
        {
            var properties = await _context.Properties.ToListAsync();
            return properties;
        }

        public async Task<ActionResult<Property>> GetPropertyById(Guid id)
        {
            var property = await _context.Properties
                .AsNoTracking()
                .Include(x => x.ParkingSpots)
                .Include(x => x.Lockers)
                .FirstOrDefaultAsync(p => p.Id == id);
            return property;
        }

        public async Task<ActionResult<Property>> CreateProperty(Property property)
        {
            _context.Properties.Add(property);
            await _context.SaveChangesAsync();
            return property;
        }


        public async Task<ActionResult<Property>> UpdateProperty(Property updatedProperty)
        {
            var existingProperty = await _context.Properties
                .Include(p => p.ParkingSpots)
                .Include(p => p.Lockers)
                .FirstOrDefaultAsync(p => p.Id == updatedProperty.Id);

            if (existingProperty == null) return null;

            existingProperty.PropertyName = !string.IsNullOrEmpty(updatedProperty.PropertyName) ? updatedProperty.PropertyName : existingProperty.PropertyName;
            existingProperty.CompanyName = !string.IsNullOrEmpty(updatedProperty.CompanyName) ? updatedProperty.CompanyName : existingProperty.CompanyName;
            existingProperty.Address = !string.IsNullOrEmpty(updatedProperty.Address) ? updatedProperty.Address : existingProperty.Address;
            existingProperty.City = !string.IsNullOrEmpty(updatedProperty.City) ? updatedProperty.City : existingProperty.City;

            foreach (var updatedSpot in updatedProperty.ParkingSpots ?? new List<ParkingSpot>())
            {
                var existingSpot = existingProperty.ParkingSpots
                                    .FirstOrDefault(ps => ps.Id == updatedSpot.Id);

                if (existingSpot == null)
                {
                    updatedSpot.Id = Guid.NewGuid();
                    existingProperty.ParkingSpots.Add(updatedSpot);
                    _context.Entry(updatedSpot).State = EntityState.Added;
                }
                else
                {
                    _context.Entry(existingSpot).CurrentValues.SetValues(updatedSpot);
                }
            }

            foreach (var updatedLocker in updatedProperty.Lockers ?? new List<Locker>())
            {
                var existingLocker = existingProperty.Lockers
                                    .FirstOrDefault(ps => ps.Id == updatedLocker.Id);

                if (existingLocker == null)
                {
                    updatedLocker.Id = Guid.NewGuid();
                    existingProperty.Lockers.Add(updatedLocker);
                    _context.Entry(updatedLocker).State = EntityState.Added;
                }
                else
                {
                    _context.Entry(existingLocker).CurrentValues.SetValues(updatedLocker);
                }
            }

            _context.Entry(existingProperty).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw;
            }

            return existingProperty;
        }

        public async Task<ActionResult<bool>> DeleteProperty(Guid id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null) { return false; }
            else
            {
                _context.Remove(property);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}

