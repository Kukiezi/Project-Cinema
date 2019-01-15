using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using CinemaApi.Models.UserModels;
using CinemaApi.Models.ValidateModels;
using Microsoft.AspNetCore.Hosting.Internal;
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
            if (reviewList.Count != 0)
                return Ok(reviewList);

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
            Stopwatch stopWatch = new Stopwatch();
            stopWatch.Start();
            //var test = context.Users.Join(context.UserReview, a => a.Id, b => b.UserId, (a,b) = > a)

            //var userIdentity2 = await mUserManager.FindByNameAsync(userReview.Username);

            var checkVote = (from a in context.UserReview
                          join b in context.Users on a.User.UserName equals userReview.Username
                          join c in context.Review on a.ReviewId equals userReview.IdReview
                          select new
                          {
                              checkVote = a,
                              userIdentity = a.User,
                              review = a.Review
                          }).FirstOrDefault();

         



            //var checkVote = context.UserReview
            //    .Where(a => a.User.UserName == userIdentity2.UserName && a.ReviewId == review2.IdReview).FirstOrDefault();
            if (checkVote == null)
            {
                var review = context.Review.Where(a => a.IdReview == userReview.IdReview).FirstOrDefault();
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
            else if (checkVote.checkVote.Vote == 1)
            {
                context.UserReview.Remove(checkVote.checkVote);
                checkVote.checkVote.Review.Points -= 1;
               
                //Trace.WriteLine(context.ChangeTracker.AutoDetectChangesEnabled);
                
                context.ChangeTracker.AutoDetectChangesEnabled = true;
            
                    context;
            }
            else
            {
                checkVote.checkVote.Vote = 1;
                checkVote.checkVote.Review.Points += 2;
                context.SaveChanges();
                checkVote.checkVote.Review.Vote = 1;
            }


            stopWatch.Stop();
            // Get the elapsed time as a TimeSpan value.
            TimeSpan ts = stopWatch.Elapsed;

            // Format and display the TimeSpan value.
            string elapsedTime = String.Format("{0:00}:{1:00}:{2:00}.{3:00}",
                ts.Hours, ts.Minutes, ts.Seconds,
                ts.Milliseconds / 10);
            Trace.WriteLine("RunTime " + elapsedTime);
            checkVote.checkVote.Review.Vote = 0;
            return new ApiResponse<Review>
            {
                Response = new Review
                {
                    Author = checkVote.checkVote.Review.Author,
                    Review1 = checkVote.checkVote.Review.Review1,
                    IdMovies = checkVote.checkVote.Review.IdMovies,
                    Points = checkVote.checkVote.Review.Points,
                    UserId = checkVote.checkVote.UserId,
                    IdReview = checkVote.checkVote.Review.IdReview,
                    Vote = checkVote.checkVote.Review.Vote,
                    IdResponse = checkVote.checkVote.Review.IdResponse
                }
            };

        }

        [Route("DownVote")]
        [AuthorizeToken]
        [HttpPost]
        public async Task<ApiResponse<Review>> DownVote(UserReviewApiModel userReview)
        {
            Stopwatch stopWatch = new Stopwatch();
            stopWatch.Start();
            var review = context.Review.Where(a => a.IdReview == userReview.IdReview).FirstOrDefault();
            var userIdentity = await mUserManager.FindByNameAsync(userReview.Username);

            var checkVote = context.UserReview
                .Where(a => a.UserId == userIdentity.Id && a.ReviewId == review.IdReview).FirstOrDefault();
            //var checkUpVote = context.UserReview
            //    .Where(a => a.UserId == userIdentity.Id && a.ReviewId == review.IdReview && a.Vote == 1).FirstOrDefault();

            if (checkVote == null)
            {
                review.Points -= 1;
                UserReview userDownvote = new UserReview();
                userDownvote.UserId = userIdentity.Id;
                userDownvote.ReviewId = review.IdReview;
                userDownvote.Vote = 2;
                context.UserReview.Add(userDownvote);
                context.SaveChanges();
                review.Vote = 2;
            }
            else if (checkVote.Vote == 1)
            {
                checkVote.Vote = 2;
                review.Points -= 2;
                context.SaveChanges();
                review.Vote = 2;
            }
            else
            {
                context.UserReview.Remove(checkVote);
                review.Points += 1;
                context.SaveChanges();
                review.Vote = 0;
            }


            stopWatch.Stop();
            // Get the elapsed time as a TimeSpan value.
            TimeSpan ts = stopWatch.Elapsed;

            // Format and display the TimeSpan value.
            string elapsedTime = String.Format("{0:00}:{1:00}:{2:00}.{3:00}",
                ts.Hours, ts.Minutes, ts.Seconds,
                ts.Milliseconds / 10);
            Trace.WriteLine("RunTime " + elapsedTime);

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
                    Vote =  review.Vote,
                    IdResponse = review.IdResponse
                }
            };
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

        //[Route("GetVote")]
        //[HttpGet]
        //public IActionResult GetVote(int id, string user)
        //{
        //    var review = context.Review.Where(a => a.IdReview == id).FirstOrDefault();
        //    if (user != null)
        //    {
        //        var userContext = context.Users.Where(a => a.UserName == user).FirstOrDefault();

        //        var checkVote = context.UserReview
        //            .Where(a => a.UserId == userContext.Id && a.ReviewId == review.IdReview).FirstOrDefault();

        //        if (checkVote == null)
        //            review.Vote = 0;
        //        else if (checkVote.Vote == 1)
        //            review.Vote = 1;
        //        else if (checkVote.Vote == 2)
        //            review.Vote = 2;
        //    }
        //    return Ok(review);
        //}
    }
}