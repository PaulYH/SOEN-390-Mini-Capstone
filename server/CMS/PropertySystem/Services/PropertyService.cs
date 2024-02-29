﻿using Microsoft.AspNetCore.Mvc;
using CMS.Api.Data;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;
using CMS.Api.Migrations;



namespace CMS.Api.PropertySystem.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly CMSDbContext _context;
        private readonly ICondoUnitService _condoService;

        public PropertyService(CMSDbContext context, ICondoUnitService condoService)
        {
            _context = context;
            _condoService = condoService;
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

        public async Task<ActionResult<Property>> CreateProperty(Property property)
        {
            _context.Properties.Add(property);
            await _context.SaveChangesAsync();
            return property;
        }
        public async Task<ActionResult<Property>> UpdatePropertyProfile(Property updatedProperty)
        {
            var property = await _context.Properties.FindAsync(updatedProperty.Id);
            if (property == null) { return null; }

            property.PropertyName = updatedProperty.PropertyName.IsNullOrEmpty() ?
                property.PropertyName : updatedProperty.PropertyName; 
            property.CompanyName = updatedProperty.CompanyName.IsNullOrEmpty() ?
                property.CompanyName : updatedProperty.CompanyName;
            property.City = updatedProperty.City.IsNullOrEmpty() ?
                property.City : updatedProperty.City;
            property.Address = updatedProperty.Address.IsNullOrEmpty() ?
                property.Address : updatedProperty.Address;

            await _context.SaveChangesAsync();
            return property;
        }

        public async Task<ActionResult<CondoUnit>> AddPropertyCondoUnit(Guid propertyId, Guid condoId)
        {
            var property = await _context.Properties.FindAsync(propertyId);
            if (property == null) { return null; }

            if (property.CondoUnits == null)
                property.CondoUnits = new List<CondoUnit>();

            var unit = await _condoService.GetCondoUnitsById(condoId);

            if (unit.Value == null) { return null; }

            property.CondoUnits.Add(unit.Value);

            await _context.SaveChangesAsync();

            return unit;
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

