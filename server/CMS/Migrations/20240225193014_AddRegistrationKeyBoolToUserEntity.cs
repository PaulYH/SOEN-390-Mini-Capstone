using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddRegistrationKeyBoolToUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "hasRequestedOccupantKey",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "hasRequestedOwnerKey",
                table: "AspNetUsers",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hasRequestedOccupantKey",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "hasRequestedOwnerKey",
                table: "AspNetUsers");
        }
    }
}
