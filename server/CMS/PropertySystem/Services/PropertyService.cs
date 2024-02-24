using Microsoft.AspNetCore.Mvc;
using CMS.Api.Data;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.StaticFiles;


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

        public async Task<ActionResult<string>> WriteFile(Guid id, IFormFile file)
        {
            string fileName = "";
            try
            {
                var ext = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                var originalFileName = file.FileName.Substring(0, file.FileName.LastIndexOf('.'));
                fileName = originalFileName + ext;

                var filePath = Path.Combine(Directory.GetCurrentDirectory(), $"Data\\Upload\\{id}");

                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);

                var path = Path.Combine(Directory.GetCurrentDirectory(), $"Data\\Upload\\{id}", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return fileName;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> DownloadFile(Guid id, string fileName)
        {
            var filePath =  Path.Combine(Directory.GetCurrentDirectory(), $"Data\\Upload\\{id}", fileName);

            return filePath;
        }

        public async Task<ActionResult<List<string>>> GetAllFileNames(Guid id)
        {
            var fileDirectory = Path.Combine(Directory.GetCurrentDirectory(), $"Data\\Upload\\{id}");

            if (!Directory.Exists(fileDirectory))
                return null;

            DirectoryInfo dir = new DirectoryInfo(fileDirectory);
            FileInfo[] files = dir.GetFiles();

            List<string> result = new List<string>();
            foreach (FileInfo file in files)
            {
                result.Add(file.Name);
            }

            return result;
        }
    }
}

