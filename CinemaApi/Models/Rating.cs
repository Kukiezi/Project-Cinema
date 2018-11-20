using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Rating
    {
        public int IdRating { get; set; }
        public int IdMovies { get; set; }
        public int RatingNumber { get; set; }

        public Movies IdMoviesNavigation { get; set; }
    }
}
