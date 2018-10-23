using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Movies
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int AgeRestriction { get; set; }
    }
}
