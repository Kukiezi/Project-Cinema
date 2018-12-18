using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Review
    {
        public int IdReview { get; set; }
        public int IdMovies { get; set; }
        public string Author { get; set; }
        public string Review1 { get; set; }

        public Movies IdMoviesNavigation { get; set; }
    }
}
