using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaApi.Data
{
    public class CinemaDbContext : DbContext
    {
        /// <summary>
        /// The setting for the application
        /// </summary>
        public DbSet<MoviesDataModel> Movies { get; set; }

        public CinemaDbContext(DbContextOptions<CinemaDbContext> options) : base(options)
        {

        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);
        //    optionsBuilder.UseSqlServer("Server = az1.shaikat.net; Database = CinemaDB; User Id = cinemadb_user; Password = JGFiu93p;Trusted_Connection=True;Integrated Security=False;MultipleActiveResultSets=true");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
