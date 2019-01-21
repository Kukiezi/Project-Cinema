using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models
{
    public class ScreeningExt
    {
        public int IdScreening { get; set; }
        public int IdRoom { get; set; }
        public DateTime ScreeningDate { get; set; }
        public int IdMovies { get; set; }
        public TimeSpan showtime1 { get; set; }
        public TimeSpan showtime2 { get; set; }
        public TimeSpan showtime3 { get; set; }

        public string MovieName { get; set; }
    }
}
