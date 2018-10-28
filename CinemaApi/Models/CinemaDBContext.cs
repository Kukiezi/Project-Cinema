using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CinemaApi.Models
{
    public partial class CinemaDBContext : DbContext
    {
        public CinemaDBContext()
        {
        }

        public CinemaDBContext(DbContextOptions<CinemaDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CulturalEvent> CulturalEvent { get; set; }
        public virtual DbSet<EventAddress> EventAddress { get; set; }
        public virtual DbSet<Movies> Movies { get; set; }
        public virtual DbSet<Newsletter> Newsletter { get; set; }
        public virtual DbSet<PersonalData> PersonalData { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Room> Room { get; set; }
        public virtual DbSet<Screening> Screening { get; set; }
        public virtual DbSet<Seat> Seat { get; set; }
        public virtual DbSet<SeatReservation> SeatReservation { get; set; }
        public virtual DbSet<SigningIn> SigningIn { get; set; }
        public virtual DbSet<UserAccount> UserAccount { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CulturalEvent>(entity =>
            {
                entity.HasKey(e => e.IdCulturalEvent);

                entity.ToTable("Cultural_Event");

                entity.Property(e => e.IdCulturalEvent)
                    .HasColumnName("id_cultural_event")
                    .ValueGeneratedNever();

                entity.Property(e => e.EventDate)
                    .HasColumnName("event_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.EventDescription)
                    .IsRequired()
                    .HasColumnName("event_description")
                    .IsUnicode(false);

                entity.Property(e => e.EventName)
                    .IsRequired()
                    .HasColumnName("event_name")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IdEventAddress).HasColumnName("id_event_address");

                entity.Property(e => e.SeatsLimit).HasColumnName("seats_limit");

                entity.HasOne(d => d.IdEventAddressNavigation)
                    .WithMany(p => p.CulturalEvent)
                    .HasForeignKey(d => d.IdEventAddress)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cultural___id_ev__59FA5E80");
            });

            modelBuilder.Entity<EventAddress>(entity =>
            {
                entity.HasKey(e => e.IdEventAddress);

                entity.ToTable("Event_Address");

                entity.Property(e => e.IdEventAddress)
                    .HasColumnName("id_event_address")
                    .ValueGeneratedNever();

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasColumnName("city")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Number)
                    .IsRequired()
                    .HasColumnName("number")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PostalCode)
                    .IsRequired()
                    .HasColumnName("postal_code")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.Street)
                    .IsRequired()
                    .HasColumnName("street")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Movies>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(2048);

                entity.Property(e => e.Icon)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Picture)
                    .IsRequired()
                    .HasDefaultValueSql("(N'')");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(64);
            });

            modelBuilder.Entity<Newsletter>(entity =>
            {
                entity.HasKey(e => e.IdNewsletter);

                entity.Property(e => e.IdNewsletter)
                    .HasColumnName("id_newsletter")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdPersonalData).HasColumnName("id_personal_data");

                entity.HasOne(d => d.IdPersonalDataNavigation)
                    .WithMany(p => p.Newsletter)
                    .HasForeignKey(d => d.IdPersonalData)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Newslette__id_pe__75A278F5");
            });

            modelBuilder.Entity<PersonalData>(entity =>
            {
                entity.HasKey(e => e.IdPersonalData);

                entity.ToTable("Personal_Data");

                entity.Property(e => e.IdPersonalData)
                    .HasColumnName("id_personal_data")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClientName)
                    .IsRequired()
                    .HasColumnName("client_name")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ClientSurname)
                    .IsRequired()
                    .HasColumnName("client_surname")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.IdReservation);

                entity.Property(e => e.IdReservation)
                    .HasColumnName("id_reservation")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdPersonalData).HasColumnName("id_personal_data");

                entity.HasOne(d => d.IdPersonalDataNavigation)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.IdPersonalData)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Reservati__id_pe__656C112C");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.IdRoles);

                entity.Property(e => e.IdRoles)
                    .HasColumnName("id_roles")
                    .ValueGeneratedNever();

                entity.Property(e => e.RoleDescription)
                    .IsRequired()
                    .HasColumnName("role_description")
                    .IsUnicode(false);

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasColumnName("role_name")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.HasKey(e => e.IdRoom);

                entity.Property(e => e.IdRoom)
                    .HasColumnName("id_room")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdSeat).HasColumnName("id_seat");

                entity.Property(e => e.RoomNumber).HasColumnName("room_number");

                entity.HasOne(d => d.IdSeatNavigation)
                    .WithMany(p => p.Room)
                    .HasForeignKey(d => d.IdSeat)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Room__id_seat__628FA481");
            });

            modelBuilder.Entity<Screening>(entity =>
            {
                entity.HasKey(e => e.IdScreening);

                entity.Property(e => e.IdScreening)
                    .HasColumnName("id_screening")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdMovies).HasColumnName("id_Movies");

                entity.Property(e => e.IdRoom).HasColumnName("id_Room");

                entity.Property(e => e.ScreeningDate)
                    .HasColumnName("screening_date")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.IdMoviesNavigation)
                    .WithMany(p => p.Screening)
                    .HasForeignKey(d => d.IdMovies)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Screening__id_Mo__71D1E811");

                entity.HasOne(d => d.IdRoomNavigation)
                    .WithMany(p => p.Screening)
                    .HasForeignKey(d => d.IdRoom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Screening__id_Ro__72C60C4A");
            });

            modelBuilder.Entity<Seat>(entity =>
            {
                entity.HasKey(e => e.IdSeat);

                entity.Property(e => e.IdSeat)
                    .HasColumnName("id_seat")
                    .ValueGeneratedNever();

                entity.Property(e => e.RowNumb)
                    .IsRequired()
                    .HasColumnName("row_numb")
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.SeatNumb).HasColumnName("seat_numb");
            });

            modelBuilder.Entity<SeatReservation>(entity =>
            {
                entity.HasKey(e => new { e.IdSeat, e.IdReservation });

                entity.ToTable("Seat_Reservation");

                entity.Property(e => e.IdSeat).HasColumnName("id_seat");

                entity.Property(e => e.IdReservation).HasColumnName("id_reservation");

                entity.HasOne(d => d.IdReservationNavigation)
                    .WithMany(p => p.SeatReservation)
                    .HasForeignKey(d => d.IdReservation)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seat_Rese__id_re__693CA210");

                entity.HasOne(d => d.IdSeatNavigation)
                    .WithMany(p => p.SeatReservation)
                    .HasForeignKey(d => d.IdSeat)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seat_Rese__id_se__68487DD7");
            });

            modelBuilder.Entity<SigningIn>(entity =>
            {
                entity.HasKey(e => e.IdSigningIn);

                entity.ToTable("Signing_In");

                entity.Property(e => e.IdSigningIn)
                    .HasColumnName("id_signing_in")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdEvent).HasColumnName("id_event");

                entity.Property(e => e.IdPersonalData).HasColumnName("id_personal_data");

                entity.HasOne(d => d.IdEventNavigation)
                    .WithMany(p => p.SigningIn)
                    .HasForeignKey(d => d.IdEvent)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Signing_I__id_ev__5CD6CB2B");

                entity.HasOne(d => d.IdPersonalDataNavigation)
                    .WithMany(p => p.SigningIn)
                    .HasForeignKey(d => d.IdPersonalData)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Signing_I__id_pe__5DCAEF64");
            });

            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.HasKey(e => e.IdUserAccount);

                entity.ToTable("User_Account");

                entity.Property(e => e.IdUserAccount)
                    .HasColumnName("id_user_account")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.IdUserRole).HasColumnName("id_user_role");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasColumnName("user_password")
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => new { e.IdUserAccount, e.IdRoles });

                entity.ToTable("User_Role");

                entity.Property(e => e.IdUserAccount).HasColumnName("id_user_account");

                entity.Property(e => e.IdRoles).HasColumnName("id_roles");

                entity.HasOne(d => d.IdRolesNavigation)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.IdRoles)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__User_Role__id_ro__6EF57B66");

                entity.HasOne(d => d.IdUserAccountNavigation)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.IdUserAccount)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__User_Role__id_us__6E01572D");
            });
        }
    }
}
