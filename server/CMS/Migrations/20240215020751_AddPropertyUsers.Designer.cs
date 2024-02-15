﻿// <auto-generated />
using System;
using CMS.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CMS.Api.Migrations
{
    [DbContext(typeof(CMSDbContext))]
    [Migration("20240215020751_AddPropertyUsers")]
    partial class AddPropertyUsers
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CMS.Api.FinancialSystem.Payment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("TransactionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.CondoUnit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ExternalUnitId")
                        .HasColumnType("int");

                    b.Property<decimal>("FeePerSquareFoot")
                        .HasColumnType("decimal(6, 2)");

                    b.Property<string>("OccupantId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("OwnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PropertyUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("RegistrationKey")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Size")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OccupantId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("PropertyUserId");

                    b.ToTable("CondoUnits");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.Locker", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ExternalLockerId")
                        .HasColumnType("int");

                    b.Property<decimal>("LockerFee")
                        .HasColumnType("decimal(6, 2)");

                    b.Property<string>("OwnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PropertyUserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("PropertyUserId");

                    b.ToTable("Lockers");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.ParkingSpot", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ExternalSpotId")
                        .HasColumnType("int");

                    b.Property<string>("OwnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PropertyUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal>("SpotFee")
                        .HasColumnType("decimal(6, 2)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("PropertyUserId");

                    b.ToTable("ParkingSpots");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.ReservableRoom", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ExternalRoomId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PropertyUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid?>("ReservableRoomId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PropertyUserId");

                    b.HasIndex("ReservableRoomId");

                    b.ToTable("ReservableRooms");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.Reservation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("ReservedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ReservedById");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("CMS.Api.RequestSystem.Entities.RequestTicket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AssignedToId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CreatedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExternalTicketId")
                        .HasColumnType("int");

                    b.Property<bool>("IsMuted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ResolutionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AssignedToId");

                    b.HasIndex("CreatedById");

                    b.ToTable("RequestTickets");
                });

            modelBuilder.Entity("CMS.Api.RequestSystem.Entities.TicketPost", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CreatedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ReplyToId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("RequestTicketId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("Viewed")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("ReplyToId");

                    b.HasIndex("RequestTicketId");

                    b.ToTable("TicketPosts");
                });

            modelBuilder.Entity("CMS.Api.UserSystem.Entities.ProfilePicture", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("ImageData")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("ImageType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ProfilePictures");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("CMS.Api.UserSystem.Entities.PropertyUser", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PropertyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("PropertyUser");
                });

            modelBuilder.Entity("CMS.Api.UserSystem.Entities.PublicUser", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<string>("EmployerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ProfilePictureId")
                        .HasColumnType("uniqueidentifier");

                    b.HasIndex("EmployerId");

                    b.HasIndex("ProfilePictureId");

                    b.HasDiscriminator().HasValue("PublicUser");
                });

            modelBuilder.Entity("CMS.Api.FinancialSystem.Payment", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.CondoUnit", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "Occupant")
                        .WithMany("RentedCondoUnits")
                        .HasForeignKey("OccupantId");

                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "Owner")
                        .WithMany("OwnedCondoUnits")
                        .HasForeignKey("OwnerId");

                    b.HasOne("CMS.Api.UserSystem.Entities.PropertyUser", null)
                        .WithMany("CondoUnits")
                        .HasForeignKey("PropertyUserId");

                    b.Navigation("Occupant");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.Locker", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "Owner")
                        .WithMany("Lockers")
                        .HasForeignKey("OwnerId");

                    b.HasOne("CMS.Api.UserSystem.Entities.PropertyUser", null)
                        .WithMany("Lockers")
                        .HasForeignKey("PropertyUserId");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.ParkingSpot", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "Owner")
                        .WithMany("ParkingSpots")
                        .HasForeignKey("OwnerId");

                    b.HasOne("CMS.Api.UserSystem.Entities.PropertyUser", null)
                        .WithMany("ParkingSpots")
                        .HasForeignKey("PropertyUserId");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.ReservableRoom", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PropertyUser", null)
                        .WithMany("ReservableRooms")
                        .HasForeignKey("PropertyUserId");

                    b.HasOne("CMS.Api.PropertySystem.Entities.ReservableRoom", null)
                        .WithMany("Reservations")
                        .HasForeignKey("ReservableRoomId");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.Reservation", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "ReservedBy")
                        .WithMany()
                        .HasForeignKey("ReservedById");

                    b.Navigation("ReservedBy");
                });

            modelBuilder.Entity("CMS.Api.RequestSystem.Entities.RequestTicket", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "AssignedTo")
                        .WithMany()
                        .HasForeignKey("AssignedToId");

                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.Navigation("AssignedTo");

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("CMS.Api.RequestSystem.Entities.TicketPost", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("CMS.Api.RequestSystem.Entities.TicketPost", "ReplyTo")
                        .WithMany()
                        .HasForeignKey("ReplyToId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("CMS.Api.RequestSystem.Entities.RequestTicket", null)
                        .WithMany("TicketPosts")
                        .HasForeignKey("RequestTicketId");

                    b.Navigation("CreatedBy");

                    b.Navigation("ReplyTo");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("CMS.Api.UserSystem.Entities.PublicUser", b =>
                {
                    b.HasOne("CMS.Api.UserSystem.Entities.PublicUser", "Employer")
                        .WithMany()
                        .HasForeignKey("EmployerId");

                    b.HasOne("CMS.Api.UserSystem.Entities.ProfilePicture", "ProfilePicture")
                        .WithMany()
                        .HasForeignKey("ProfilePictureId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Employer");

                    b.Navigation("ProfilePicture");
                });

            modelBuilder.Entity("CMS.Api.PropertySystem.Entities.ReservableRoom", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("CMS.Api.RequestSystem.Entities.RequestTicket", b =>
                {
                    b.Navigation("TicketPosts");
                });

            modelBuilder.Entity("CMS.Api.UserSystem.Entities.PropertyUser", b =>
                {
                    b.Navigation("CondoUnits");

                    b.Navigation("Lockers");

                    b.Navigation("ParkingSpots");

                    b.Navigation("ReservableRooms");
                });

            modelBuilder.Entity("CMS.Api.UserSystem.Entities.PublicUser", b =>
                {
                    b.Navigation("Lockers");

                    b.Navigation("OwnedCondoUnits");

                    b.Navigation("ParkingSpots");

                    b.Navigation("RentedCondoUnits");
                });
#pragma warning restore 612, 618
        }
    }
}
