using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace src.Migrations
{
    public partial class CreatingUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Firstname = table.Column<string>(nullable: true),
                    Gender = table.Column<int>(nullable: false),
                    Income = table.Column<double>(nullable: false),
                    Lastname = table.Column<string>(nullable: true),
                    Latitude = table.Column<double>(nullable: true),
                    Longitude = table.Column<double>(nullable: true),
                    NumberOfFamilyMembers = table.Column<int>(nullable: false),
                    Picture = table.Column<byte[]>(nullable: true),
                    SinceUTC = table.Column<DateTime>(nullable: false),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Expenses",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Latitude",
                table: "Expenses",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Longitude",
                table: "Expenses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_UserId",
                table: "Expenses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_User_UserId",
                table: "Expenses",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_User_UserId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_UserId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Expenses");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
