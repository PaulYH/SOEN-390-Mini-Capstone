using CMS.Api.Data;
using CMS.Api.PropertySystem.Services;
using CMS.Api.UserSystem.Entities;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using CMS.Api;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy",
        builder =>
        {
            builder.WithOrigins("*")
            .WithMethods("POST", "DELETE", "GET", "PUT")
            .AllowAnyHeader();
        });
});

builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve); ;
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
});

builder.Services.AddDbContext<CMSDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IApplicationUserService, ApplicationUserService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<ICondoUnitService, CondoUnitService>();
builder.Services.AddScoped<IParkingSpotService, ParkingSpotService>();
builder.Services.AddScoped<ILockerService, LockerService>();
builder.Services.AddSingleton<ISystemTime, SystemTime>();

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<CMSDbContext>();


var app = builder.Build();

app.UseCors("CORSPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapIdentityApi<ApplicationUser>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var roles = new[] { "Public", "Owner", "Renter", "Employee" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }


    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    var users = await userManager.Users.ToListAsync();

    foreach (var user in users)
    {
        var userRoles = await userManager.GetRolesAsync(user);

        if (userRoles.Count == 0)
        {
            await userManager.AddToRoleAsync(user, "Public");
        }
    }    
}

app.Services.GetRequiredService<ISystemTime>();

app.Run();
