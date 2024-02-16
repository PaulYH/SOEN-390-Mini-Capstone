using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPropertyUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_EmployerId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OccupantId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OwnerId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_AspNetUsers_UserId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestTickets_AspNetUsers_AssignedToId",
                table: "RequestTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestTickets_AspNetUsers_CreatedById",
                table: "RequestTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_AspNetUsers_ReservedById",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketPosts_AspNetUsers_CreatedById",
                table: "TicketPosts");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "TicketPosts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "ReservedById",
                table: "Reservations",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "ReservableRooms",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "RequestTickets",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "AssignedToId",
                table: "RequestTickets",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Payments",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "ParkingSpots",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "Lockers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "CondoUnits",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "OccupantId",
                table: "CondoUnits",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "PropertyUserId",
                table: "CondoUnits",
                type: "nvarchar(450)",
                nullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_EmployerId",
                table: "AspNetUsers",
                column: "EmployerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OccupantId",
                table: "CondoUnits",
                column: "OccupantId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OwnerId",
                table: "CondoUnits",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_AspNetUsers_PropertyUserId",
                table: "CondoUnits",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lockers_AspNetUsers_PropertyUserId",
                table: "Lockers",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_PropertyUserId",
                table: "ParkingSpots",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_AspNetUsers_UserId",
                table: "Payments",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestTickets_AspNetUsers_AssignedToId",
                table: "RequestTickets",
                column: "AssignedToId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestTickets_AspNetUsers_CreatedById",
                table: "RequestTickets",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservableRooms_AspNetUsers_PropertyUserId",
                table: "ReservableRooms",
                column: "PropertyUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_AspNetUsers_ReservedById",
                table: "Reservations",
                column: "ReservedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketPosts_AspNetUsers_CreatedById",
                table: "TicketPosts",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_EmployerId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OccupantId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OwnerId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_CondoUnits_AspNetUsers_PropertyUserId",
                table: "CondoUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_OwnerId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_Lockers_AspNetUsers_PropertyUserId",
                table: "Lockers");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_OwnerId",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_ParkingSpots_AspNetUsers_PropertyUserId",
                table: "ParkingSpots");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_AspNetUsers_UserId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestTickets_AspNetUsers_AssignedToId",
                table: "RequestTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestTickets_AspNetUsers_CreatedById",
                table: "RequestTickets");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservableRooms_AspNetUsers_PropertyUserId",
                table: "ReservableRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_AspNetUsers_ReservedById",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketPosts_AspNetUsers_CreatedById",
                table: "TicketPosts");

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
                name: "PropertyName",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "TicketPosts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ReservedById",
                table: "Reservations",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "RequestTickets",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AssignedToId",
                table: "RequestTickets",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Payments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "CondoUnits",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OccupantId",
                table: "CondoUnits",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetUsers_EmployerId",
                table: "AspNetUsers",
                column: "EmployerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OccupantId",
                table: "CondoUnits",
                column: "OccupantId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CondoUnits_AspNetUsers_OwnerId",
                table: "CondoUnits",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_AspNetUsers_UserId",
                table: "Payments",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestTickets_AspNetUsers_AssignedToId",
                table: "RequestTickets",
                column: "AssignedToId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestTickets_AspNetUsers_CreatedById",
                table: "RequestTickets",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_AspNetUsers_ReservedById",
                table: "Reservations",
                column: "ReservedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketPosts_AspNetUsers_CreatedById",
                table: "TicketPosts",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
