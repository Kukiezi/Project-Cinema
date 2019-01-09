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
        public int IdMovies { get; set; }
        public int IdRoom { get; set; }
        public DateTime? ScreeningDate { get; set; }

        public virtual Movies IdMoviesNavigation { get; set; }
        public virtual Room IdRoomNavigation { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}