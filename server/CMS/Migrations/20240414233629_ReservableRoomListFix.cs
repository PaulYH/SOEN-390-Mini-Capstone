using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReservableRoomListFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservableRooms_ReservableRooms_ReservableRoomId",
                table: "ReservableRooms");

            migrationBuilder.DropIndex(
                name: "IX_ReservableRooms_ReservableRoomId",
                table: "ReservableRooms");

            migrationBuilder.DropColumn(
                name: "ReservableRoomId",
                table: "ReservableRooms");

            migrationBuilder.AddColumn<Guid>(
                name: "ReservableRoomId",
                table: "Reservations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ReservableRoomId",
                table: "Reservations",
                column: "ReservableRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservableRooms_ReservableRoomId",
                table: "Reservations",
                column: "ReservableRoomId",
                principalTable: "ReservableRooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservableRooms_ReservableRoomId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ReservableRoomId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReservableRoomId",
                table: "Reservations");

            migrationBuilder.AddColumn<Guid>(
                name: "ReservableRoomId",
                table: "ReservableRooms",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservableRooms_ReservableRoomId",
                table: "ReservableRooms",
                column: "ReservableRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservableRooms_ReservableRooms_ReservableRoomId",
                table: "ReservableRooms",
                column: "ReservableRoomId",
                principalTable: "ReservableRooms",
                principalColumn: "Id");
        }
    }
}
