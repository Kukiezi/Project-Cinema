using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Movies
    {
        public Movies()
        {
            RatingNavigation = new HashSet<Rating>();
            Review = new HashSet<Review>();
            Screening = new HashSet<Screening>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int AgeRestriction { get; set; }
        public string Icon { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public string WatchingTime { get; set; }
        public double Rating { get; set; }

        public virtual ICollection<Rating> RatingNavigation { get; set; }
        public virtual ICollection<Review> Review { get; set; }
        public virtual ICollection<Screening> Screening { get; set; }
    }
}