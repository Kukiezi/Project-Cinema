using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using CinemaApi.Models.UserModels;
using CinemaApi.Models.ValidateModels;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public ActionResult GetReviews(int id, string user)
        {
            var reviewList = context.Review.Where(a => a.IdMovies == id && a.IdResponse == null).ToList();
            if (user != null)
            {
                var userContext = context.Users.FirstOrDefault(a => a.UserName == user);
                foreach (var rev in reviewList)
                {
                    var checkVote = context.UserReview.FirstOrDefault(a => a.UserId == userContext.Id && a.ReviewId == rev.IdReview);


                    if (checkVote == null)
                        rev.Vote = 0;
                    else if (checkVote.Vote == 1)
                        rev.Vote = 1;
                    else if (checkVote.Vote == 2)
                        rev.Vote = 2;

                    rev.UserReview.Clear();
                }
            }
            List<Review> revList = reviewList.OrderByDescending(o => o.Points).ToList();
            if (reviewList.Count != 0)
                return Ok(revList);

            return NotFound();
        }

        [HttpGet]
        [Route("GetReviewOriginal")]
        public ActionResult GetReviewOriginal(int id, string user)
        {
            var review= context.Review.Where(a => a.IdReview == id).ToList();
            if (user != null)
            {
                var userContext = context.Users.Where(a => a.UserName == user).FirstOrDefault();
                foreach (var rev in review)
                {
                    var checkVote = context.UserReview
                        .Where(a => a.UserId == userContext.Id && a.ReviewId == rev.IdReview).FirstOrDefault();

                    if (checkVote == null)
                        rev.Vote = 0;
                    else if (checkVote.Vote == 1)
                        rev.Vote = 1;
                    else if (checkVote.Vote == 2)
                        rev.Vote = 2;

                    rev.UserReview.Clear();
                }
            }
            if (review.Count != 0)
                return Ok(review);

            return NotFound();
        }

        [HttpGet]
        [Route("GetReviewAnswers")]
        public ActionResult GetReviewAnswers(int id, string user)
        {
            var reviewList = context.Review.Where(a => a.IdResponse == id).ToList();
            if (user != null)
            {
                var userContext = context.Users.Where(a => a.UserName == user).FirstOrDefault();
                foreach (var rev in reviewList)
                {
                    var checkVote = context.UserReview
                        .Where(a => a.UserId == userContext.Id && a.ReviewId == rev.IdReview).FirstOrDefault();

                    if (checkVote == null)
                        rev.Vote = 0;
                    else if (checkVote.Vote == 1)
                        rev.Vote = 1;
                    else if (checkVote.Vote == 2)
                        rev.Vote = 2;

                    rev.UserReview.Clear();
                }
            }
            if (reviewList.Count != 0)
                return Ok(reviewList);

            return NotFound();
        }

        [HttpGet]
        [Route("GetResponseCount")]
        public async Task<int> GetResponseCount(int id)
        {
            var reviewList = context.Review.Where(a => a.IdResponse == id).ToList();
            
        
                return reviewList.Count;
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
        [Route("AddResponse")]
        [AuthorizeToken]
        [HttpPost]
        public async Task<ApiResponse<Review>> AddResponse(Review review)
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
                Author = review.Author,
                IdResponse = review.IdResponse
                
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
           
            var errorResponse = new ApiResponse<Review>
            {
                // Set error message
                ErrorMessage = "Coś poszło nie tak!"
            };
       
            if (userReview.Action == 0)
            {
                var review = context.Review.FirstOrDefault(a => a.IdReview == userReview.IdReview);
                var userIdentity = await mUserManager.FindByNameAsync(userReview.Username);
                review.Points += 1;
                UserReview userUpvote = new UserReview();
                userUpvote.UserId = userIdentity.Id;
                userUpvote.ReviewId = review.IdReview;
                userUpvote.Vote = 1;
                context.UserReview.Add(userUpvote);
                context.SaveChanges();
                review.Vote = 1;
               
                return new ApiResponse<Review>
                {
                    Response = new Review
                    {
                        Author = review.Author,
                        Review1 = review.Review1,
                        IdMovies = review.IdMovies,
                        Points = review.Points,
                        UserId = userIdentity.Id,
                        IdReview = review.IdReview,
                        Vote = review.Vote,
                        IdResponse = review.IdResponse
                    }
                };
            }
            else if (userReview.Action == 1)
            {
                var checkVote = (from a in context.UserReview
                    join b in context.Users on a.User.UserName equals userReview.Username
                    join c in context.Review on a.ReviewId equals userReview.IdReview
                    select new
                    {
                        checkVote = a,
                        userIdentity = a.User,
                        review = a.Review
                    }).FirstOrDefault();

                context.UserReview.Remove(checkVote.checkVote);
                checkVote.review.Points -= 1;
                context.SaveChanges();
                checkVote.review.Vote = 0;

              
                return new ApiResponse<Review>
                {
                    Response = new Review
                    {
                        Author = checkVote.review.Author,
                        Review1 = checkVote.review.Review1,
                        IdMovies = checkVote.review.IdMovies,
                        Points = checkVote.review.Points,
                        UserId = checkVote.checkVote.UserId,
                        IdReview = checkVote.review.IdReview,
                        Vote = checkVote.review.Vote,
                        IdResponse = checkVote.review.IdResponse
                    }
                };
            }
            else if (userReview.Action == 2)
            {
                var checkVote = (from a in context.UserReview
                    join b in context.Users on a.User.UserName equals userReview.Username
                    join c in context.Review on a.ReviewId equals userReview.IdReview
                    select new
                    {
                        checkVote = a,
                        userIdentity = a.User,
                        review = a.Review
                    }).FirstOrDefault();

                checkVote.checkVote.Vote = 1;
                checkVote.review.Points += 2;
                context.SaveChanges();
                checkVote.review.Vote = 0;
             

               
                return new ApiResponse<Review>
                {
                    Response = new Review
                    {
                        Author = checkVote.review.Author,
                        Review1 = checkVote.review.Review1,
                        IdMovies = checkVote.review.IdMovies,
                        Points = checkVote.review.Points,
                        UserId = checkVote.checkVote.UserId,
                        IdReview = checkVote.review.IdReview,
                        Vote = checkVote.review.Vote,
                        IdResponse = checkVote.review.IdResponse
                    }
                };
            }

        
            return errorResponse;

        }

        [Route("DownVote")]
        [AuthorizeToken]
        [HttpPost]
        public async Task<ApiResponse<Review>> DownVote(UserReviewApiModel userReview)
        {
            var errorResponse = new ApiResponse<Review>
            {
                // Set error message
                ErrorMessage = "Coś poszło nie tak!"
            };
            if (userReview.Action == 0)
            {
                var review = context.Review.Where(a => a.IdReview == userReview.IdReview).FirstOrDefault();
                var userIdentity = await mUserManager.FindByNameAsync(userReview.Username);
                review.Points -= 1;
                UserReview userDownvote = new UserReview();
                userDownvote.UserId = userIdentity.Id;
                userDownvote.ReviewId = review.IdReview;
                userDownvote.Vote = 2;

                context.UserReview.Add(userDownvote);

                context.SaveChanges();
                review.Vote = 2;
              
                return new ApiResponse<Review>
                {
                    Response = new Review
                    {
                        Author = review.Author,
                        Review1 = review.Review1,
                        IdMovies = review.IdMovies,
                        Points = review.Points,
                        UserId = userIdentity.Id,
                        IdReview = review.IdReview,
                        Vote = review.Vote,
                        IdResponse = review.IdResponse
                    }
                };
            }
            else if (userReview.Action == 1)
            {
                var checkVote = (from a in context.UserReview
                    join b in context.Users on a.User.UserName equals userReview.Username
                    join c in context.Review on a.ReviewId equals userReview.IdReview
                    select new
                    {
                        checkVote = a,
                        userIdentity = a.User,
                        review = a.Review
                    }).FirstOrDefault();

                checkVote.checkVote.Vote = 2;
                checkVote.review.Points -= 2;

                context.SaveChanges();
                checkVote.review.Vote = 2;

                return new ApiResponse<Review>
                {
                    Response = new Review
                    {
                        Author = checkVote.review.Author,
                        Review1 = checkVote.review.Review1,
                        IdMovies = checkVote.review.IdMovies,
                        Points = checkVote.review.Points,
                        UserId = checkVote.userIdentity.Id,
                        IdReview = checkVote.review.IdReview,
                        Vote = checkVote.review.Vote,
                        IdResponse = checkVote.review.IdResponse
                    }
                };
            }
            else if (userReview.Action == 2)
            {
                var checkVote = (from a in context.UserReview
                    join b in context.Users on a.User.UserName equals userReview.Username
                    join c in context.Review on a.ReviewId equals userReview.IdReview
                    select new
                    {
                        checkVote = a,
                        userIdentity = a.User,
                        review = a.Review
                    }).FirstOrDefault();

                context.UserReview.Remove(checkVote.checkVote);
                checkVote.review.Points += 1;
                context.SaveChanges();
                checkVote.review.Vote = 0;

                return new ApiResponse<Review>
                {
                    Response = new Review
                    {
                        Author = checkVote.review.Author,
                        Review1 = checkVote.review.Review1,
                        IdMovies = checkVote.review.IdMovies,
                        Points = checkVote.review.Points,
                        UserId = checkVote.userIdentity.Id,
                        IdReview = checkVote.review.IdReview,
                        Vote = checkVote.review.Vote,
                        IdResponse = checkVote.review.IdResponse
                    }
                };
            }

            return errorResponse;
        }
        [Route("GetPoints")]
        [HttpGet]
        public IActionResult GetPoints(int id, string user)
        {
            var review = context.Review.Where(a => a.IdReview == id).FirstOrDefault();
            if (user != null)
            {
                var userContext = context.Users.Where(a => a.UserName == user).FirstOrDefault();

                var checkVote = context.UserReview
                    .Where(a => a.UserId == userContext.Id && a.ReviewId == review.IdReview).FirstOrDefault();

                if (checkVote == null)
                    review.Vote = 0;
                else if (checkVote.Vote == 1)
                    review.Vote = 1;
                else if (checkVote.Vote == 2)
                    review.Vote = 2;
            }
            review.UserReview.Clear();
            return Ok(review);
        }

        [Route("DeleteReview")]
        [HttpPost]
        [AuthorizeToken]
        public IActionResult DeleteReview(UserReviewApiModel userReview)
        {
            var review = context.Review.FirstOrDefault(a => a.IdReview == userReview.IdReview);
            var userReviewList = context.UserReview.Where(a => a.ReviewId == userReview.IdReview).ToList();
            var responseList = context.Review.Where(a => a.IdResponse == userReview.IdReview).ToList();
            if (review != null)
            {
                if (userReviewList.Count > 0)
                {
                    foreach (var item in userReviewList)
                    {
                        context.Remove(item);
                    }
                }

                if (responseList.Count > 0)
                {
                    foreach (var item in responseList)
                    {
                        context.Remove(item);
                    }
                }
                context.Remove(review);

                context.SaveChanges();
                return Ok("Opinia została usunięta");
            }
               
           
            return Ok("Opinia jest już usunięta");

        }

    }
}