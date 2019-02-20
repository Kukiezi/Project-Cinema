using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models
{
    public class UserReviewApiModel
    {
        public string Username { get; set; }
        public int IdReview { get; set; }
        public int Action { get; set; }
    }
}
