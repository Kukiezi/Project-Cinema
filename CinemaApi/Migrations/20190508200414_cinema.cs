using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaApi.Migrations
{
    public partial class cinema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Screening__id_Mo__339FAB6E",
                table: "Screening");

            migrationBuilder.DropTable(
                name: "User_role");

            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "User_Account");

            migrationBuilder.DropColumn(
                name: "screening_time",
                table: "Screening");

            migrationBuilder.RenameColumn(
                name: "id_Movies",
                table: "Screening",
                newName: "id_movies");

            migrationBuilder.RenameIndex(
                name: "IX_Screening_id_Movies",
                table: "Screening",
                newName: "IX_Screening_id_movies");

            migrationBuilder.AlterColumn<DateTime>(
                name: "screening_date",
                table: "Screening",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MovieName",
                table: "Screening",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "showtime1",
                table: "Screening",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "showtime2",
                table: "Screening",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "showtime3",
                table: "Screening",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<string>(
                name: "layout",
                table: "Room",
                unicode: false,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "id_response",
                table: "Review",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Review",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Review",
                maxLength: 450,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Vote",
                table: "Review",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "id_user_account",
                table: "Reservation",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "id_user",
                table: "Reservation",
                maxLength: 450,
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "showtime",
                table: "Reservation",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Rating",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "User_Review",
                columns: table => new
                {
                    UserReviewId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(maxLength: 450, nullable: false),
                    ReviewId = table.Column<int>(nullable: false),
                    Vote = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Review", x => x.UserReviewId);
                    table.ForeignKey(
                        name: "FK__User_Revi__Revie__05A3D694",
                        column: x => x.ReviewId,
                        principalTable: "Review",
                        principalColumn: "id_review",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__User_Revi__UserI__04AFB25B",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rating_UserId",
                table: "Rating",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Review_ReviewId",
                table: "User_Review",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Review_UserId",
                table: "User_Review",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_AspNetUsers_UserId",
                table: "Rating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Screening__id_mo__09746778",
                table: "Screening",
                column: "id_movies",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_AspNetUsers_UserId",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK__Screening__id_mo__09746778",
                table: "Screening");

            migrationBuilder.DropTable(
                name: "User_Review");

            migrationBuilder.DropIndex(
                name: "IX_Rating_UserId",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "MovieName",
                table: "Screening");

            migrationBuilder.DropColumn(
                name: "showtime1",
                table: "Screening");

            migrationBuilder.DropColumn(
                name: "showtime2",
                table: "Screening");

            migrationBuilder.DropColumn(
                name: "showtime3",
                table: "Screening");

            migrationBuilder.DropColumn(
                name: "layout",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "id_response",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Points",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "Vote",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "id_user",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "showtime",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Rating");

            migrationBuilder.RenameColumn(
                name: "id_movies",
                table: "Screening",
                newName: "id_Movies");

            migrationBuilder.RenameIndex(
                name: "IX_Screening_id_movies",
                table: "Screening",
                newName: "IX_Screening_id_Movies");

            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "User_Account",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "User_Account",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "User_Account",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "User_Account",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "User_Account",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "User_Account",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "screening_date",
                table: "Screening",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "screening_time",
                table: "Screening",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "id_user_account",
                table: "Reservation",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "User_role",
                columns: table => new
                {
                    id_user_role = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    id_roles = table.Column<int>(nullable: false),
                    id_user_account = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_role", x => x.id_user_role);
                    table.ForeignKey(
                        name: "FK__User_role__id_ro__3864608B",
                        column: x => x.id_roles,
                        principalTable: "Roles",
                        principalColumn: "id_roles",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__User_role__id_us__37703C52",
                        column: x => x.id_user_account,
                        principalTable: "User_Account",
                        principalColumn: "id_user_account",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_role_id_roles",
                table: "User_role",
                column: "id_roles");

            migrationBuilder.CreateIndex(
                name: "IX_User_role_id_user_account",
                table: "User_role",
                column: "id_user_account");

            migrationBuilder.AddForeignKey(
                name: "FK__Screening__id_Mo__339FAB6E",
                table: "Screening",
                column: "id_Movies",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
