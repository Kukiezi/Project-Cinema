using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly CinemaDBContext context;
        public ReviewController(CinemaDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        [Route("GetReviews")]
        public ActionResult GetReviews(int id)
        {
            var reviewList = context.Review.Where(a => a.IdMovies == id).ToList();
            if (reviewList.Count != 0)
                return Ok(reviewList);

            return NotFound();
        }

        [Route("AddReview")]
        [HttpPost]
        public ActionResult AddReview(Review review)
        {
            context.Review.Add(new Review
            {
                Author = review.Author,
                Review1 = review.Review1,
                IdMovies = review.IdMovies
            });

            context.SaveChanges();
            return Ok(review);
        }
    }
}