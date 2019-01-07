﻿// <auto-generated />
using System;
using CinemaApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CinemaApi.Migrations
{
    [DbContext(typeof(CinemaDBContext))]
    partial class CinemaDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CinemaApi.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("CinemaApi.Models.CulturalEvent", b =>
                {
                    b.Property<int>("IdCulturalEvent")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_cultural_event")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("EventDate")
                        .HasColumnName("event_date")
                        .HasColumnType("datetime");

                    b.Property<string>("EventDescription")
                        .IsRequired()
                        .HasColumnName("event_description")
                        .IsUnicode(false);

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasColumnName("event_name")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<int>("IdEventAddress")
                        .HasColumnName("id_event_address");

                    b.Property<int>("SeatsLimit")
                        .HasColumnName("seats_limit");

                    b.HasKey("IdCulturalEvent");

                    b.HasIndex("IdEventAddress");

                    b.ToTable("Cultural_Event");
                });

            modelBuilder.Entity("CinemaApi.Models.EventAddress", b =>
                {
                    b.Property<int>("IdEventAddress")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_event_address")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnName("city")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnName("number")
                        .HasMaxLength(10)
                        .IsUnicode(false);

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnName("postal_code")
                        .HasMaxLength(11)
                        .IsUnicode(false);

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnName("street")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("IdEventAddress");

                    b.ToTable("Event_Address");
                });

            modelBuilder.Entity("CinemaApi.Models.Movies", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AgeRestriction");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(2048);

                    b.Property<string>("Director")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("(N'')")
                        .HasMaxLength(40)
                        .IsUnicode(false);

                    b.Property<string>("Genre")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("(N'')")
                        .HasMaxLength(20)
                        .IsUnicode(false);

                    b.Property<string>("Icon")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("((0))")
                        .IsUnicode(false);

                    b.Property<string>("Picture")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("(N'')");

                    b.Property<double>("Rating")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("(N'')");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<string>("WatchingTime")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("(N'')")
                        .HasMaxLength(20)
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("CinemaApi.Models.Newsletter", b =>
                {
                    b.Property<int>("IdNewsletter")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_newsletter")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdUserAccount")
                        .HasColumnName("id_user_account");

                    b.HasKey("IdNewsletter");

                    b.HasIndex("IdUserAccount");

                    b.ToTable("Newsletter");
                });

            modelBuilder.Entity("CinemaApi.Models.Rating", b =>
                {
                    b.Property<int>("IdRating")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_rating")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdMovies")
                        .HasColumnName("id_Movies");

                    b.Property<int>("RatingNumber")
                        .HasColumnName("rating_number");

                    b.HasKey("IdRating");

                    b.HasIndex("IdMovies");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("CinemaApi.Models.Reservation", b =>
                {
                    b.Property<int>("IdReservation")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_reservation")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdScreening")
                        .HasColumnName("id_screening");

                    b.Property<int>("IdUserAccount")
                        .HasColumnName("id_user_account");

                    b.Property<string>("SeatsReserved")
                        .IsRequired()
                        .HasColumnName("seats_reserved")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("IdReservation");

                    b.HasIndex("IdScreening");

                    b.HasIndex("IdUserAccount");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("CinemaApi.Models.Review", b =>
                {
                    b.Property<int>("IdReview")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_review")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnName("author")
                        .HasMaxLength(40)
                        .IsUnicode(false);

                    b.Property<int>("IdMovies")
                        .HasColumnName("id_Movies");

                    b.Property<string>("Review1")
                        .IsRequired()
                        .HasColumnName("review")
                        .IsUnicode(false);

                    b.HasKey("IdReview");

                    b.HasIndex("IdMovies");

                    b.ToTable("Review");
                });

            modelBuilder.Entity("CinemaApi.Models.Roles", b =>
                {
                    b.Property<int>("IdRoles")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_roles")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RoleDescription")
                        .IsRequired()
                        .HasColumnName("role_description")
                        .IsUnicode(false);

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnName("role_name")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.HasKey("IdRoles");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("CinemaApi.Models.Room", b =>
                {
                    b.Property<int>("IdRoom")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_room")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdSeat")
                        .HasColumnName("id_seat");

                    b.Property<int>("RoomNumber")
                        .HasColumnName("room_number");

                    b.HasKey("IdRoom");

                    b.HasIndex("IdSeat");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("CinemaApi.Models.Screening", b =>
                {
                    b.Property<int>("IdScreening")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_screening")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdMovies")
                        .HasColumnName("id_Movies");

                    b.Property<int>("IdRoom")
                        .HasColumnName("id_Room");

                    b.Property<DateTime?>("ScreeningDate")
                        .HasColumnName("screening_date")
                        .HasColumnType("date");

                    b.Property<TimeSpan?>("ScreeningTime")
                        .HasColumnName("screening_time");

                    b.HasKey("IdScreening");

                    b.HasIndex("IdMovies");

                    b.HasIndex("IdRoom");

                    b.ToTable("Screening");
                });

            modelBuilder.Entity("CinemaApi.Models.Seat", b =>
                {
                    b.Property<int>("IdSeat")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_seat")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RowNumb")
                        .IsRequired()
                        .HasColumnName("row_numb")
                        .HasMaxLength(3)
                        .IsUnicode(false);

                    b.Property<int>("SeatNumb")
                        .HasColumnName("seat_numb");

                    b.HasKey("IdSeat");

                    b.ToTable("Seat");
                });

            modelBuilder.Entity("CinemaApi.Models.SeatReservation", b =>
                {
                    b.Property<int>("IdSeatReservation")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_seat_reservation")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdSeat")
                        .HasColumnName("id_seat");

                    b.HasKey("IdSeatReservation");

                    b.HasIndex("IdSeat");

                    b.ToTable("Seat_Reservation");
                });

            modelBuilder.Entity("CinemaApi.Models.SigningIn", b =>
                {
                    b.Property<int>("IdSigningIn")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_signing_in")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdCulturalEvent")
                        .HasColumnName("id_cultural_event");

                    b.Property<int>("IdUserAccount")
                        .HasColumnName("id_user_account");

                    b.HasKey("IdSigningIn");

                    b.HasIndex("IdCulturalEvent");

                    b.HasIndex("IdUserAccount");

                    b.ToTable("Signing_In");
                });

            modelBuilder.Entity("CinemaApi.Models.UserAccount", b =>
                {
                    b.Property<int>("IdUserAccount")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_user_account")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp");

                    b.Property<string>("Email")
                        .HasColumnName("email")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("Id");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail");

                    b.Property<string>("NormalizedUserName");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasColumnName("user_name")
                        .HasMaxLength(20)
                        .IsUnicode(false);

                    b.Property<string>("UserPassword")
                        .HasColumnName("user_password")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<string>("UserSurname")
                        .HasColumnName("user_surname")
                        .HasMaxLength(25)
                        .IsUnicode(false);

                    b.HasKey("IdUserAccount");

                    b.ToTable("User_Account");
                });

            modelBuilder.Entity("CinemaApi.Models.UserRole", b =>
                {
                    b.Property<int>("IdUserRole")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_user_role")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdRoles")
                        .HasColumnName("id_roles");

                    b.Property<int>("IdUserAccount")
                        .HasColumnName("id_user_account");

                    b.HasKey("IdUserRole");

                    b.HasIndex("IdRoles");

                    b.HasIndex("IdUserAccount");

                    b.ToTable("User_role");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("CinemaApi.Models.CulturalEvent", b =>
                {
                    b.HasOne("CinemaApi.Models.EventAddress", "IdEventAddressNavigation")
                        .WithMany("CulturalEvent")
                        .HasForeignKey("IdEventAddress")
                        .HasConstraintName("FK__Cultural___id_ev__1332DBDC");
                });

            modelBuilder.Entity("CinemaApi.Models.Newsletter", b =>
                {
                    b.HasOne("CinemaApi.Models.UserAccount", "IdUserAccountNavigation")
                        .WithMany("Newsletter")
                        .HasForeignKey("IdUserAccount")
                        .HasConstraintName("FK__Newslette__id_us__160F4887");
                });

            modelBuilder.Entity("CinemaApi.Models.Rating", b =>
                {
                    b.HasOne("CinemaApi.Models.Movies", "IdMoviesNavigation")
                        .WithMany("RatingNavigation")
                        .HasForeignKey("IdMovies")
                        .HasConstraintName("FK__Rating__id_Movie__29221CFB");
                });

            modelBuilder.Entity("CinemaApi.Models.Reservation", b =>
                {
                    b.HasOne("CinemaApi.Models.Screening", "IdScreeningNavigation")
                        .WithMany("Reservation")
                        .HasForeignKey("IdScreening")
                        .HasConstraintName("FK__Reservati__id_sc__41EDCAC5");

                    b.HasOne("CinemaApi.Models.UserAccount", "IdUserAccountNavigation")
                        .WithMany("Reservation")
                        .HasForeignKey("IdUserAccount")
                        .HasConstraintName("FK__Reservati__id_us__40F9A68C");
                });

            modelBuilder.Entity("CinemaApi.Models.Review", b =>
                {
                    b.HasOne("CinemaApi.Models.Movies", "IdMoviesNavigation")
                        .WithMany("Review")
                        .HasForeignKey("IdMovies")
                        .HasConstraintName("FK__Review__id_Movie__5224328E");
                });

            modelBuilder.Entity("CinemaApi.Models.Room", b =>
                {
                    b.HasOne("CinemaApi.Models.Seat", "IdSeatNavigation")
                        .WithMany("Room")
                        .HasForeignKey("IdSeat")
                        .HasConstraintName("FK__Room__id_seat__30C33EC3");
                });

            modelBuilder.Entity("CinemaApi.Models.Screening", b =>
                {
                    b.HasOne("CinemaApi.Models.Movies", "IdMoviesNavigation")
                        .WithMany("Screening")
                        .HasForeignKey("IdMovies")
                        .HasConstraintName("FK__Screening__id_Mo__339FAB6E");

                    b.HasOne("CinemaApi.Models.Room", "IdRoomNavigation")
                        .WithMany("Screening")
                        .HasForeignKey("IdRoom")
                        .HasConstraintName("FK__Screening__id_Ro__3493CFA7");
                });

            modelBuilder.Entity("CinemaApi.Models.SeatReservation", b =>
                {
                    b.HasOne("CinemaApi.Models.Seat", "IdSeatNavigation")
                        .WithMany("SeatReservation")
                        .HasForeignKey("IdSeat")
                        .HasConstraintName("FK__Seat_Rese__id_se__245D67DE");
                });

            modelBuilder.Entity("CinemaApi.Models.SigningIn", b =>
                {
                    b.HasOne("CinemaApi.Models.CulturalEvent", "IdCulturalEventNavigation")
                        .WithMany("SigningIn")
                        .HasForeignKey("IdCulturalEvent")
                        .HasConstraintName("FK__Signing_I__id_cu__1CBC4616");

                    b.HasOne("CinemaApi.Models.UserAccount", "IdUserAccountNavigation")
                        .WithMany("SigningIn")
                        .HasForeignKey("IdUserAccount")
                        .HasConstraintName("FK__Signing_I__id_us__1DB06A4F");
                });

            modelBuilder.Entity("CinemaApi.Models.UserRole", b =>
                {
                    b.HasOne("CinemaApi.Models.Roles", "IdRolesNavigation")
                        .WithMany("UserRole")
                        .HasForeignKey("IdRoles")
                        .HasConstraintName("FK__User_role__id_ro__3864608B");

                    b.HasOne("CinemaApi.Models.UserAccount", "IdUserAccountNavigation")
                        .WithMany("UserRole")
                        .HasForeignKey("IdUserAccount")
                        .HasConstraintName("FK__User_role__id_us__37703C52");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("CinemaApi.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("CinemaApi.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CinemaApi.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("CinemaApi.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
