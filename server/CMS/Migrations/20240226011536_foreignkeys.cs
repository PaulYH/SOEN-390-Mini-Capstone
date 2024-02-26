using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class foreignkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "ParkingSpots",
                newName: "ApplicationUser");

            migrationBuilder.RenameIndex(
                name: "IX_ParkingSpots_OwnerId",
                table: "ParkingSpots",
                newName: "IX_ParkingSpots_ApplicationUser");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Lockers",
                newName: "ApplicationUser");

            migrationBuilder.RenameIndex(
                name: "IX_Lockers_OwnerId",
                table: "Lockers",
                newName: "IX_Lockers_ApplicationUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_ApplicationUser",
                table: "Lockers",
                column: "ApplicationUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_ApplicationUser",
                table: "ParkingSpots",
                column: "ApplicationUser",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_ApplicationUser",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_ApplicationUser",
                table: "ParkingSpots");

            migrationBuilder.RenameColumn(
                name: "ApplicationUser",
                table: "ParkingSpots",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_ParkingSpots_ApplicationUser",
                table: "ParkingSpots",
                newName: "IX_ParkingSpots_OwnerId");

            migrationBuilder.RenameColumn(
                name: "ApplicationUser",
                table: "Lockers",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Lockers_ApplicationUser",
                table: "Lockers",
                newName: "IX_Lockers_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
