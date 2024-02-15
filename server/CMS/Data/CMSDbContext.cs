using CMS.Api.FinancialSystem;
using CMS.Api.PropertySystem.Entities;
using CMS.Api.RequestSystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CMS.Api.Data
{
    public class CMSDbContext : IdentityDbContext
    {
        public CMSDbContext(DbContextOptions<CMSDbContext> options) : base(options)
        {
            
        }
        public DbSet<PublicUser> PublicUsers { get; set; }
        public DbSet<PropertyUser> PropertyUsers { get; set; }
        public DbSet<ProfilePicture> ProfilePictures { get; set; }
        public DbSet<CondoUnit> CondoUnits { get; set; }
        public DbSet<Locker> Lockers { get; set; }
        public DbSet<ParkingSpot> ParkingSpots { get; set; }
        public DbSet<ReservableRoom> ReservableRooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<RequestTicket> RequestTickets { get; set; }
        public DbSet<TicketPost> TicketPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
            .SelectMany(t => t.GetForeignKeys())
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
}
