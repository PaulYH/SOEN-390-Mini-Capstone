using CMS.Api.PropertySystem.Entities;
using CMS.Api.UserSystem.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Tests.Services.TestBases
{
    public abstract class ReservableRoomServiceTestsBase : IDisposable
    {
        private static PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();

        private static DbContextOptions<CMSDbContext> dbContextOptions = new DbContextOptionsBuilder<CMSDbContext>()
            .UseInMemoryDatabase(databaseName: "ReservableRoomTests")
            .Options;
        public CMSDbContext _context;

        protected ReservableRoomServiceTestsBase()
        {
            _context = new CMSDbContext(dbContextOptions);
            _context.Database.EnsureCreated();
            SeedDatabase();
        }
        public void Dispose()
        {
            _context.Database.EnsureDeleted();

        }

        private void SeedDatabase()
        {
            var property = new Property()
            {
                Id = Guid.NewGuid(),
                PropertyName = "Property1",
                CompanyName = "Company1",
                Address = "Street1",
                City = "City1",
                CondoUnits = null,
                ParkingSpots = null,
                Lockers = null,
                ReservableRooms = null
            };

            _context.Properties.Add(property);

            var users = new List<ApplicationUser>
            {
                new ApplicationUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "User1First",
                    LastName = "User1Last",
                    Email = "user1@test.com",
                    ProfilePicture = new ProfilePicture(),
                    Property = property,
                    hasRequestedOccupantKey = false,
                    hasRequestedOwnerKey = false,
                    ParkingSpots = null,
                    Lockers = null,
                    OwnedCondoUnits = null,
                    RentedCondoUnits = null
                },
                new ApplicationUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "User2First",
                    LastName = "User2Last",
                    Email = "user2@test.com",
                    ProfilePicture = null,
                    Property = property,
                    hasRequestedOccupantKey = false,
                    hasRequestedOwnerKey = true,
                    ParkingSpots = null,
                    Lockers = null,
                    OwnedCondoUnits = null,
                    RentedCondoUnits = null
                },
                new ApplicationUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    FirstName = "User3First",
                    LastName = "User3Last",
                    Email = "user3@test.com",
                    ProfilePicture = null,
                    Property = property,
                    hasRequestedOccupantKey = false,
                    hasRequestedOwnerKey = false,
                    ParkingSpots = null,
                    Lockers = null,
                    OwnedCondoUnits = null,
                    RentedCondoUnits = null
                }
            };

            foreach (ApplicationUser user in users)
            {
                user.PasswordHash = hasher.HashPassword(user, "12Admin34?");
            }

            _context.Users.AddRange(users);

            var rooms = new List<ReservableRoom>()
            {
                new ReservableRoom()
                {
                    Id = Guid.NewGuid(),
                    ExternalRoomId = 1,
                    Name = "Room1"
                },
                new ReservableRoom()
                {
                    Id = Guid.NewGuid(),
                    ExternalRoomId = 2,
                    Name = "Room2"
                },
                new ReservableRoom()
                {
                    Id = Guid.NewGuid(),
                    ExternalRoomId = 3,
                    Name = "Room3"
                }
            };

            _context.ReservableRooms.AddRange(rooms);
            _context.SaveChanges();

            var reservations1 = new List<Reservation>()
            {
                new Reservation()
                        {
                            Id = Guid.NewGuid(),
                            StartTime = DateTime.Now.AddDays(3),
                            EndTime = DateTime.Now.AddDays(3).AddHours(2),
                            ReservedBy = _context.Users.First()
                        },
                        new Reservation()
                        {
                            Id = Guid.NewGuid(),
                            StartTime = DateTime.Now.AddDays(7),
                            EndTime = DateTime.Now.AddDays(7).AddHours(2),
                            ReservedBy = _context.Users.Where(x => x.FirstName == "User2First").First()
                        },
                        new Reservation()
                        {
                            Id = Guid.NewGuid(),
                            StartTime = DateTime.Now.AddDays(8),
                            EndTime = DateTime.Now.AddDays(8).AddHours(2),
                            ReservedBy = _context.Users.Where(x => x.FirstName == "User3First").First()
                        }
            };
            var reservations2 = new List<Reservation>()
            {
                new Reservation()
                        {
                            Id = Guid.NewGuid(),
                            StartTime = DateTime.Now.AddDays(5),
                            EndTime = DateTime.Now.AddDays(5).AddHours(2),
                            ReservedBy = _context.Users.First()
                        }
            };
            var reservations3 = new List<Reservation>()
            {
                                        new Reservation()
                        {
                            Id = Guid.NewGuid(),
                            StartTime = DateTime.Now.AddDays(12),
                            EndTime = DateTime.Now.AddDays(12).AddHours(2),
                            ReservedBy = _context.Users.First()
                        },
                        new Reservation()
                        {
                            Id = Guid.NewGuid(),
                            StartTime = DateTime.Now.AddDays(32),
                            EndTime = DateTime.Now.AddDays(32).AddHours(2),
                            ReservedBy = _context.Users.Where(x => x.FirstName == "User1First").First()
                        }
            };

            _context.Reservations.AddRange(reservations1);
            _context.Reservations.AddRange(reservations2);
            _context.Reservations.AddRange(reservations3);

            _context.SaveChanges();

            _context.ReservableRooms.Where(x => x.Name == "Room1").First().Reservations = reservations1;
            _context.ReservableRooms.Where(x => x.Name == "Room2").First().Reservations = reservations2;
            _context.ReservableRooms.Where(x => x.Name == "Room3").First().Reservations = reservations3;

            _context.SaveChanges();
        }
    }
}
