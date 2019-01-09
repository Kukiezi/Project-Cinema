using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models.ValidateModels
{
    public class ReviewApiModel
    {
        public int IdReview { get; set; }
        public int IdMovies { get; set; }
        public string Author { get; set; }
        public string Review1 { get; set; }
        public string AccessToken { get; set; }
        
    }
}
