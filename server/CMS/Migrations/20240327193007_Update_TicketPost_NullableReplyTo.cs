using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.Api.Migrations
{
    /// <inheritdoc />
    public partial class Update_TicketPost_NullableReplyTo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketPosts_TicketPosts_ReplyToId",
                table: "TicketPosts");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReplyToId",
                table: "TicketPosts",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketPosts_TicketPosts_ReplyToId",
                table: "TicketPosts",
                column: "ReplyToId",
                principalTable: "TicketPosts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketPosts_TicketPosts_ReplyToId",
                table: "TicketPosts");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReplyToId",
                table: "TicketPosts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketPosts_TicketPosts_ReplyToId",
                table: "TicketPosts",
                column: "ReplyToId",
                principalTable: "TicketPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
