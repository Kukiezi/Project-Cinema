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

        public virtual DbSet<Movies> Movies { get; set; }

     

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movies>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(2048);

                entity.Property(e => e.Picture)
                    .IsRequired()
                    .HasDefaultValueSql("(N'')");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(64);
            });
        }
    }
}
