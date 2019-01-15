﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        public ActionResult GetReviews(int id, string user)
        {
            var reviewList = context.Review.Where(a => a.IdMovies == id).ToList();
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
            var review = context.Review.Where(a => a.IdReview == userReview.IdReview).FirstOrDefault();
            var userIdentity = await mUserManager.FindByNameAsync(userReview.Username);
            var checkVote = context.UserReview
                .Where(a => a.UserId == userIdentity.Id && a.ReviewId == review.IdReview).FirstOrDefault();
           
            if (checkVote == null)
            {
                review.Points += 1;
                UserReview userUpvote = new UserReview();
                userUpvote.UserId = userIdentity.Id;
                userUpvote.ReviewId = review.IdReview;
                userUpvote.Vote = 1;
                context.UserReview.Add(userUpvote);
                context.SaveChanges();
                review.Vote = 1;
            }
            else if (checkVote.Vote == 1)
            {
                context.UserReview.Remove(checkVote);
                review.Points -= 1;
                context.SaveChanges();
                review.Vote = 0;
            }
            else
            {
                checkVote.Vote = 1;
                review.Points += 2;
                context.SaveChanges();
                review.Vote = 1;
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
                    IdReview = review.IdReview,
                    Vote = review.Vote
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
            //if (checkDownVote != null && review != null)
            //{
            //    context.UserReview.Remove(checkDownVote);
            //    review.Points += 1;
            //    context.SaveChanges();
            //    review.Vote = 0;
            //}

            //else if (checkUpVote != null && review != null)
            //{
            //    checkUpVote.Vote = 2;
            //    review.Points -= 2;
            //    context.SaveChanges();
            //    review.Vote = 2;
            //}

            //else
            //{
            //    review.Points -= 1;
            //    UserReview userDownvote = new UserReview();
            //    userDownvote.UserId = userIdentity.Id;
            //    userDownvote.ReviewId = review.IdReview;
            //    userDownvote.Vote = 2;
            //    context.UserReview.Add(userDownvote);
            //    context.SaveChanges();
            //    review.Vote = 2;
            //}

       


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
                    Vote =  review.Vote
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