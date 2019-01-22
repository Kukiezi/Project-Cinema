using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Screening
    {
        public Screening()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int IdScreening { get; set; }
        public int IdRoom { get; set; }
        public DateTime? ScreeningDate { get; set; }
        public int? IdMovies { get; set; }
        public TimeSpan? Showtime1 { get; set; }
        public TimeSpan? Showtime2 { get; set; }
        public TimeSpan? Showtime3 { get; set; }

        public Movies IdMoviesNavigation { get; set; }
        public Room IdRoomNavigation { get; set; }
        public ICollection<Reservation> Reservation { get; set; }
    }
}
