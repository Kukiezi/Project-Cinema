using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using CinemaApi.Models.UserModels;
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
                Author = review.Author
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

        [Route("UpVote")]
        [AuthorizeToken]
        [HttpPost]
        public async Task<ApiResponse<Review>> UpVote(UserReviewApiModel userReview)
        {
            var review = context.Review.Where(a => a.IdReview == userReview.IdReview).FirstOrDefault();
            var userIdentity = await mUserManager.FindByNameAsync(userReview.Username);

            var checkUpvote = context.UserReview
                .Where(a => a.UserId == userIdentity.Id && a.ReviewId == review.IdReview).FirstOrDefault();

            if (checkUpvote != null && review != null)
            {
                context.UserReview.Remove(checkUpvote);
                review.Points -= 1;
                context.SaveChanges();
            }

            else
            {
                review.Points += 1;
                UserReview userUpvote = new UserReview();
                userUpvote.UserId = userIdentity.Id;
                userUpvote.ReviewId = review.IdReview;

                context.UserReview.Add(userUpvote);

                context.SaveChanges();
            }
          
            


            return new ApiResponse<Review>
            {
                Response = new Review
                {
                    Author = review.Author,
                    Review1 = review.Review1,
                    IdMovies = review.IdMovies,
                    Points = review.Points,
                    UserId = userIdentity.Id,
                    IdReview = review.IdReview
                }
            };
        }

        [Route("DownVote")]
        [AuthorizeToken]
        [HttpPost]
        public async Task<ApiResponse<Review>> DownVote(UserReviewApiModel userReview)
        {
            var review = context.Review.Where(a => a.IdReview == userReview.IdReview).FirstOrDefault();
            var userIdentity = await mUserManager.FindByNameAsync(userReview.Username);

            var checkDownVote = context.UserReview
                .Where(a => a.UserId == userIdentity.Id && a.ReviewId == review.IdReview).FirstOrDefault();

            if (checkDownVote != null && review != null)
            {
                context.UserReview.Remove(checkDownVote);
                review.Points += 1;
                context.SaveChanges();
            }

            else
            {
                review.Points -= 1;
                UserReview userUpvote = new UserReview();
                userUpvote.UserId = userIdentity.Id;
                userUpvote.ReviewId = review.IdReview;

                context.UserReview.Add(userUpvote);

                context.SaveChanges();
            }




            return new ApiResponse<Review>
            {
                Response = new Review
                {
                    Author = review.Author,
                    Review1 = review.Review1,
                    IdMovies = review.IdMovies,
                    Points = review.Points,
                    UserId = userIdentity.Id,
                    IdReview = review.IdReview
                }
            };
        }
        [Route("GetPoints")]
        [HttpGet]
        public IActionResult GetPoints(int id)
        {
            var review = context.Review.Where(a => a.IdReview == id).FirstOrDefault();
     
            return Ok(review);
        }
    }
}