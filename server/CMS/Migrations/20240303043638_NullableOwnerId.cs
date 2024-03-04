using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class NullableOwnerId : Migration
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

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
