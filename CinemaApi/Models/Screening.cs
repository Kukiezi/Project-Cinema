using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Screening
    {
        public int IdScreening { get; set; }
        public int IdMovies { get; set; }
        public int IdRoom { get; set; }
        public DateTime ScreeningDate { get; set; }

        public Movies IdMoviesNavigation { get; set; }
        public Room IdRoomNavigation { get; set; }
    }
}
