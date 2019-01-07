using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaApi.Migrations
{
    public partial class migration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            //migrationBuilder.CreateTable(
            //    name: "Event_Address",
            //    columns: table => new
            //    {
            //        street = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
            //        number = table.Column<string>(unicode: false, maxLength: 10, nullable: false),
            //        postal_code = table.Column<string>(unicode: false, maxLength: 11, nullable: false),
            //        city = table.Column<string>(unicode: false, maxLength: 30, nullable: false),
            //        id_event_address = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Event_Address", x => x.id_event_address);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Movies",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        Title = table.Column<string>(maxLength: 64, nullable: false),
            //        Description = table.Column<string>(maxLength: 2048, nullable: false),
            //        Picture = table.Column<string>(nullable: false, defaultValueSql: "(N'')"),
            //        AgeRestriction = table.Column<int>(nullable: false),
            //        Icon = table.Column<string>(unicode: false, nullable: false, defaultValueSql: "((0))"),
            //        Genre = table.Column<string>(unicode: false, maxLength: 20, nullable: false, defaultValueSql: "(N'')"),
            //        Director = table.Column<string>(unicode: false, maxLength: 40, nullable: false, defaultValueSql: "(N'')"),
            //        WatchingTime = table.Column<string>(unicode: false, maxLength: 20, nullable: false, defaultValueSql: "(N'')"),
            //        Rating = table.Column<double>(nullable: false, defaultValueSql: "(N'')")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Movies", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Roles",
            //    columns: table => new
            //    {
            //        role_name = table.Column<string>(unicode: false, maxLength: 30, nullable: false),
            //        role_description = table.Column<string>(unicode: false, nullable: false),
            //        id_roles = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Roles", x => x.id_roles);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Seat",
            //    columns: table => new
            //    {
            //        row_numb = table.Column<string>(unicode: false, maxLength: 3, nullable: false),
            //        seat_numb = table.Column<int>(nullable: false),
            //        id_seat = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Seat", x => x.id_seat);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "User_Account",
            //    columns: table => new
            //    {
            //        Id = table.Column<string>(nullable: true),
            //        NormalizedUserName = table.Column<string>(nullable: true),
            //        NormalizedEmail = table.Column<string>(nullable: true),
            //        EmailConfirmed = table.Column<bool>(nullable: false),
            //        PasswordHash = table.Column<string>(nullable: true),
            //        SecurityStamp = table.Column<string>(nullable: true),
            //        ConcurrencyStamp = table.Column<string>(nullable: true),
            //        PhoneNumber = table.Column<string>(nullable: true),
            //        PhoneNumberConfirmed = table.Column<bool>(nullable: false),
            //        TwoFactorEnabled = table.Column<bool>(nullable: false),
            //        LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
            //        LockoutEnabled = table.Column<bool>(nullable: false),
            //        AccessFailedCount = table.Column<int>(nullable: false),
            //        email = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
            //        user_password = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
            //        user_name = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
            //        user_surname = table.Column<string>(unicode: false, maxLength: 25, nullable: true),
            //        id_user_account = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_User_Account", x => x.id_user_account);
            //    });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            //migrationBuilder.CreateTable(
            //    name: "Cultural_Event",
            //    columns: table => new
            //    {
            //        event_name = table.Column<string>(unicode: false, maxLength: 30, nullable: false),
            //        event_description = table.Column<string>(unicode: false, nullable: false),
            //        event_date = table.Column<DateTime>(type: "datetime", nullable: false),
            //        seats_limit = table.Column<int>(nullable: false),
            //        id_cultural_event = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_event_address = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Cultural_Event", x => x.id_cultural_event);
            //        table.ForeignKey(
            //            name: "FK__Cultural___id_ev__1332DBDC",
            //            column: x => x.id_event_address,
            //            principalTable: "Event_Address",
            //            principalColumn: "id_event_address",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Rating",
            //    columns: table => new
            //    {
            //        id_rating = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_Movies = table.Column<int>(nullable: false),
            //        rating_number = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Rating", x => x.id_rating);
            //        table.ForeignKey(
            //            name: "FK__Rating__id_Movie__29221CFB",
            //            column: x => x.id_Movies,
            //            principalTable: "Movies",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Review",
            //    columns: table => new
            //    {
            //        id_review = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_Movies = table.Column<int>(nullable: false),
            //        author = table.Column<string>(unicode: false, maxLength: 40, nullable: false),
            //        review = table.Column<string>(unicode: false, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Review", x => x.id_review);
            //        table.ForeignKey(
            //            name: "FK__Review__id_Movie__5224328E",
            //            column: x => x.id_Movies,
            //            principalTable: "Movies",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Room",
            //    columns: table => new
            //    {
            //        id_room = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        room_number = table.Column<int>(nullable: false),
            //        id_seat = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Room", x => x.id_room);
            //        table.ForeignKey(
            //            name: "FK__Room__id_seat__30C33EC3",
            //            column: x => x.id_seat,
            //            principalTable: "Seat",
            //            principalColumn: "id_seat",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Seat_Reservation",
            //    columns: table => new
            //    {
            //        id_seat_reservation = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_seat = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Seat_Reservation", x => x.id_seat_reservation);
            //        table.ForeignKey(
            //            name: "FK__Seat_Rese__id_se__245D67DE",
            //            column: x => x.id_seat,
            //            principalTable: "Seat",
            //            principalColumn: "id_seat",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Newsletter",
            //    columns: table => new
            //    {
            //        id_newsletter = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_user_account = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Newsletter", x => x.id_newsletter);
            //        table.ForeignKey(
            //            name: "FK__Newslette__id_us__160F4887",
            //            column: x => x.id_user_account,
            //            principalTable: "User_Account",
            //            principalColumn: "id_user_account",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "User_role",
            //    columns: table => new
            //    {
            //        id_user_role = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_user_account = table.Column<int>(nullable: false),
            //        id_roles = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_User_role", x => x.id_user_role);
            //        table.ForeignKey(
            //            name: "FK__User_role__id_ro__3864608B",
            //            column: x => x.id_roles,
            //            principalTable: "Roles",
            //            principalColumn: "id_roles",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK__User_role__id_us__37703C52",
            //            column: x => x.id_user_account,
            //            principalTable: "User_Account",
            //            principalColumn: "id_user_account",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Signing_In",
            //    columns: table => new
            //    {
            //        id_signing_in = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_cultural_event = table.Column<int>(nullable: false),
            //        id_user_account = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Signing_In", x => x.id_signing_in);
            //        table.ForeignKey(
            //            name: "FK__Signing_I__id_cu__1CBC4616",
            //            column: x => x.id_cultural_event,
            //            principalTable: "Cultural_Event",
            //            principalColumn: "id_cultural_event",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK__Signing_I__id_us__1DB06A4F",
            //            column: x => x.id_user_account,
            //            principalTable: "User_Account",
            //            principalColumn: "id_user_account",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Screening",
            //    columns: table => new
            //    {
            //        id_screening = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_Movies = table.Column<int>(nullable: false),
            //        id_Room = table.Column<int>(nullable: false),
            //        screening_date = table.Column<DateTime>(type: "date", nullable: true),
            //        screening_time = table.Column<TimeSpan>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Screening", x => x.id_screening);
            //        table.ForeignKey(
            //            name: "FK__Screening__id_Mo__339FAB6E",
            //            column: x => x.id_Movies,
            //            principalTable: "Movies",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK__Screening__id_Ro__3493CFA7",
            //            column: x => x.id_Room,
            //            principalTable: "Room",
            //            principalColumn: "id_room",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Reservation",
            //    columns: table => new
            //    {
            //        id_reservation = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        id_user_account = table.Column<int>(nullable: false),
            //        id_screening = table.Column<int>(nullable: false),
            //        seats_reserved = table.Column<string>(unicode: false, maxLength: 50, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Reservation", x => x.id_reservation);
            //        table.ForeignKey(
            //            name: "FK__Reservati__id_sc__41EDCAC5",
            //            column: x => x.id_screening,
            //            principalTable: "Screening",
            //            principalColumn: "id_screening",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK__Reservati__id_us__40F9A68C",
            //            column: x => x.id_user_account,
            //            principalTable: "User_Account",
            //            principalColumn: "id_user_account",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Cultural_Event_id_event_address",
        //        table: "Cultural_Event",
        //        column: "id_event_address");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Newsletter_id_user_account",
        //        table: "Newsletter",
        //        column: "id_user_account");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Rating_id_Movies",
        //        table: "Rating",
        //        column: "id_Movies");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Reservation_id_screening",
        //        table: "Reservation",
        //        column: "id_screening");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Reservation_id_user_account",
        //        table: "Reservation",
        //        column: "id_user_account");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Review_id_Movies",
        //        table: "Review",
        //        column: "id_Movies");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Room_id_seat",
        //        table: "Room",
        //        column: "id_seat");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Screening_id_Movies",
        //        table: "Screening",
        //        column: "id_Movies");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Screening_id_Room",
        //        table: "Screening",
        //        column: "id_Room");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Seat_Reservation_id_seat",
        //        table: "Seat_Reservation",
        //        column: "id_seat");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Signing_In_id_cultural_event",
        //        table: "Signing_In",
        //        column: "id_cultural_event");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_Signing_In_id_user_account",
        //        table: "Signing_In",
        //        column: "id_user_account");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_User_role_id_roles",
        //        table: "User_role",
        //        column: "id_roles");

        //    migrationBuilder.CreateIndex(
        //        name: "IX_User_role_id_user_account",
        //        table: "User_role",
        //        column: "id_user_account");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            //migrationBuilder.DropTable(
            //    name: "Newsletter");

            //migrationBuilder.DropTable(
            //    name: "Rating");

            //migrationBuilder.DropTable(
            //    name: "Reservation");

            //migrationBuilder.DropTable(
            //    name: "Review");

            //migrationBuilder.DropTable(
            //    name: "Seat_Reservation");

            //migrationBuilder.DropTable(
            //    name: "Signing_In");

            //migrationBuilder.DropTable(
            //    name: "User_role");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            //migrationBuilder.DropTable(
            //    name: "Screening");

            //migrationBuilder.DropTable(
            //    name: "Cultural_Event");

            //migrationBuilder.DropTable(
            //    name: "Roles");

            //migrationBuilder.DropTable(
            //    name: "User_Account");

            //migrationBuilder.DropTable(
            //    name: "Movies");

            //migrationBuilder.DropTable(
            //    name: "Room");

            //migrationBuilder.DropTable(
            //    name: "Event_Address");

            //migrationBuilder.DropTable(
            //    name: "Seat");
        }
    }
}
