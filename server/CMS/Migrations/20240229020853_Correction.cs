using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class Correction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_ApplicationUser",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_Properties_PropertyId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_ApplicationUser",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_Properties_PropertyId",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_ParkingSpots_ApplicationUser",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_Lockers_ApplicationUser",
                table: "Lockers");

            migrationBuilder.DropColumn(
                name: "ApplicationUser",
                table: "ParkingSpots");

            migrationBuilder.DropColumn(
                name: "ApplicationUser",
                table: "Lockers");

            migrationBuilder.AlterColumn<Guid>(
                name: "PropertyId",
                table: "ParkingSpots",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "PropertyId",
                table: "Lockers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpots_OwnerId",
                table: "ParkingSpots",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Lockers_OwnerId",
                table: "Lockers",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_Properties_PropertyId",
                table: "Lockers",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_Properties_PropertyId",
                table: "ParkingSpots",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_Properties_PropertyId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_Properties_PropertyId",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_ParkingSpots_OwnerId",
                table: "ParkingSpots");

            migrationBuilder.DropIndex(
                name: "IX_Lockers_OwnerId",
                table: "Lockers");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "ParkingSpots");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Lockers");

            migrationBuilder.AlterColumn<Guid>(
                name: "PropertyId",
                table: "ParkingSpots",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUser",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "PropertyId",
                table: "Lockers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUser",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpots_ApplicationUser",
                table: "ParkingSpots",
                column: "ApplicationUser");

            migrationBuilder.CreateIndex(
                name: "IX_Lockers_ApplicationUser",
                table: "Lockers",
                column: "ApplicationUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_ApplicationUser",
                table: "Lockers",
                column: "ApplicationUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_Properties_PropertyId",
                table: "Lockers",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_ApplicationUser",
                table: "ParkingSpots",
                column: "ApplicationUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_Properties_PropertyId",
                table: "ParkingSpots",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");
        }
    }
}
