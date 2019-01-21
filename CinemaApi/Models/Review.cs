using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Review
    {
        public Review()
        {
            UserReview = new HashSet<UserReview>();
        }

        public int IdReview { get; set; }
        public int IdMovies { get; set; }
        public string Author { get; set; }
        public string Review1 { get; set; }
        public string UserId { get; set; }
        public int Points { get; set; }
        public int Vote { get; set; }
        public int? IdResponse { get; set; }

        public Movies IdMoviesNavigation { get; set; }
        public ICollection<UserReview> UserReview { get; set; }
    }
}
