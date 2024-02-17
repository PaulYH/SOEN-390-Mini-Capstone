using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class MergeUsersIntoOneAndCreatePropertyEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_EmployerId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_AspNetUsers_PropertyUserId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_PropertyUserId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_PropertyUserId",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservableRooms_AspNetUsers_PropertyUserId",
                table: "ReservableRooms");

            migrationBuilder.DropIndex(
                name: "IX_ReservableRooms_PropertyUserId",
                table: "ReservableRooms");

            migrationBuilder.DropIndex(
                name: "IX_ParkingSpots_PropertyUserId",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_Lockers_PropertyUserId",
                table: "Lockers");

            migrationBuilder.DropIndex(
                name: "IX_CondoUnits_PropertyUserId",
                table: "CondoUnits");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_EmployerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PropertyUserId",
                table: "ReservableRooms");

            migrationBuilder.DropColumn(
                name: "PropertyUserId",
                table: "ParkingSpots");

            migrationBuilder.DropColumn(
                name: "PropertyUserId",
                table: "Lockers");

            migrationBuilder.DropColumn(
                name: "PropertyUserId",
                table: "CondoUnits");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "City",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PropertyName",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<Guid>(
                name: "PropertyId",
                table: "ReservableRooms",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PropertyId",
                table: "ParkingSpots",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PropertyId",
                table: "Lockers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PropertyId",
                table: "CondoUnits",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PropertyId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PropertyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservableRooms_PropertyId",
                table: "ReservableRooms",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpots_PropertyId",
                table: "ParkingSpots",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Lockers_PropertyId",
                table: "Lockers",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_CondoUnits_PropertyId",
                table: "CondoUnits",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PropertyId",
                table: "AspNetUsers",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Properties_PropertyId",
                table: "AspNetUsers",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_Properties_PropertyId",
                table: "CondoUnits",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_Properties_PropertyId",
                table: "Lockers",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_Properties_PropertyId",
                table: "ParkingSpots",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservableRooms_Properties_PropertyId",
                table: "ReservableRooms",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Properties_PropertyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_Properties_PropertyId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_Properties_PropertyId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_Properties_PropertyId",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservableRooms_Properties_PropertyId",
                table: "ReservableRooms");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_ReservableRooms_PropertyId",
                table: "ReservableRooms");

            migrationBuilder.DropIndex(
                name: "IX_ParkingSpots_PropertyId",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_Lockers_PropertyId",
                table: "Lockers");

            migrationBuilder.DropIndex(
                name: "IX_CondoUnits_PropertyId",
                table: "CondoUnits");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PropertyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "ReservableRooms");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "ParkingSpots");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "Lockers");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "CondoUnits");

            migrationBuilder.DropColumn(
                name: "PropertyId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "ReservableRooms",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "CondoUnits",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmployerId",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PropertyName",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservableRooms_PropertyUserId",
                table: "ReservableRooms",
                column: "PropertyUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpots_PropertyUserId",
                table: "ParkingSpots",
                column: "PropertyUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Lockers_PropertyUserId",
                table: "Lockers",
                column: "PropertyUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CondoUnits_PropertyUserId",
                table: "CondoUnits",
                column: "PropertyUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_EmployerId",
                table: "AspNetUsers",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_EmployerId",
                table: "AspNetUsers",
                column: "EmployerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_AspNetUsers_PropertyUserId",
                table: "CondoUnits",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_PropertyUserId",
                table: "Lockers",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_PropertyUserId",
                table: "ParkingSpots",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservableRooms_AspNetUsers_PropertyUserId",
                table: "ReservableRooms",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
