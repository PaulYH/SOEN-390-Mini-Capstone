using Microsoft.AspNetCore.Mvc;
using CMS.Api.Data;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;


namespace CMS.Api.PropertySystem.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly CMSDbContext _context;

        public PropertyService( CMSDbContext context)
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
                .FirstOrDefaultAsync(p => p.Id == id);
            return property;
        }
    }
}

