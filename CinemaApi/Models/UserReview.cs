using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class UserReview
    {
        public int UserReviewId { get; set; }
        public string UserId { get; set; }
        public int ReviewId { get; set; }

        public Review Review { get; set; }
        public ApplicationUser User { get; set; }
    }
}
