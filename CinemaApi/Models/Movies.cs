using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Movies
    {
        public Movies()
        {
            Screening = new HashSet<Screening>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int AgeRestriction { get; set; }
        public string Icon { get; set; }

        public ICollection<Screening> Screening { get; set; }
    }
}
