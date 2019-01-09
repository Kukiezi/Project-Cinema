using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using CinemaApi.Models.ValidateModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        protected CinemaDBContext context;

        protected UserManager<ApplicationUser> mUserManager;
        public ReviewController(CinemaDBContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.mUserManager = userManager;
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
        [AuthorizeToken]
        [HttpPost]
        public async Task<ApiResponse<Review>> AddReview(Review review)
        {

            var errorResponse = new ApiResponse<Review>
            {
                // Set error message
                ErrorMessage = "Nie mogliśmy znaleźć użytkownika, który dodawał opinie!"
            };

            var userIdentity = await mUserManager.FindByNameAsync(review.Author);
            if (userIdentity == null)
                return errorResponse;
            
            context.Review.Add(new Review
            {
                UserId = userIdentity.Id,
                Review1 = review.Review1,
                IdMovies = review.IdMovies,
                Author =  review.Author
            });

            context.SaveChanges();

            return new ApiResponse<Review>
            {
                Response = new Review
                {
                    Author = review.Author,
                    Review1 = review.Review1,
                    IdMovies = review.IdMovies
                }
            };
        }
    }
}