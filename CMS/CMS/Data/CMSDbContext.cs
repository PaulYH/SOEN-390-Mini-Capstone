using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CMS.UserSystem.Entities;
using CMS.PropertySystem.Entities;
using CMS.FinancialSystem.Entities;
using CMS.RequestSystem.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Windows.Data.Xml.Dom;

namespace CMS.Data;
public class CMSDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<ApplicationUser> PublicUsers { get; set; }
    public DbSet<OwnerUser> CondoOwners { get; set; }
    public DbSet<RentalUser> CondoRentors { get; set; }
    public DbSet<EmployeeUser> Employees { get; set; }
    public DbSet<PropertyUser> CondoProperties { get; set; }
    public DbSet<Picture> ProfilePictures { get; set; }
    public DbSet<CondoUnit> CondoUnits { get; set; }
    public DbSet<ParkingSpot> ParkingSpots { get; set; }
    public DbSet<Locker> Lockers { get; set; }
    public DbSet<ReservableRoom> ReservableRooms { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<RequestTicket> RequestTickets { get; set; }
    public DbSet<TicketPost> TicketPosts { get; set; }

    #region Required
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        var cascadeFKs = modelBuilder.Model.GetEntityTypes()
        .SelectMany(t => t.GetForeignKeys())
        .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

        foreach (var fk in cascadeFKs)
            fk.DeleteBehavior = DeleteBehavior.Restrict;
    }
    #endregion

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CMS;Trusted_Connection=True;MultipleActiveResultSets=true");
    }
}
