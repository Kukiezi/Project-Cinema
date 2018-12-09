﻿using System;
using System.Diagnostics;
using System.Linq;
using CinemaApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Controllers
{
    
    [Route("cinema/")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly CinemaDBContext context;

        public MoviesController(CinemaDBContext context)
        {
            this.context = context;
        }

        /// <summary>
        ///     Metoda dostaje Get request z Front-endu i oddaje filmy z bazy danych jako JSON
        /// </summary>
        /// <returns>Filmy z bazy dasnych; Wiadomość jeżeli nie ma filmów</returns>
        [HttpGet]
        [Route("GetMovies")]
        public ActionResult GetMovies()
        {
            var moviesList = context.Movies.ToList();
            if (moviesList.Count != 0)
                return Ok(moviesList);

            return NotFound();
        }

        [HttpGet]
        [Route("GetMovie")]
        public ActionResult<Movies> GetMovie(int id)
        {
            var movie = context.Movies.Where(a => a.Id == id).FirstOrDefault();

            if (movie != null) { 
                return movie;
            }

            return NotFound();
        }

        /// <summary>
        ///     Metoda dostaje Get request z Front-endu i oddaje filmy z bazy danych jako JSON
        /// </summary>
        /// <param name="movies"></param>
        /// <returns>Dodane filmy; Wiadomość jeżeli nie zostały dodane z jakiegoś powodu</returns>
  
        [Route("AddMovie")]
        [HttpPost]
        public ActionResult AddMovie(Movies movies)
        {
            context.Movies.Add(new Movies
            {
                Title = movies.Title,
                Description = movies.Description,
                Picture = movies.Picture,
                AgeRestriction = movies.AgeRestriction,
                Icon = movies.Icon,
                Genre = movies.Genre,
                Director = movies.Director,
                WatchingTime = movies.WatchingTime

            });

            var movieExist = MovieExists(movies.Title);
            if (movieExist)
                return Ok("MOVIE ALREADY EXISTS");

            context.SaveChanges();
            return Ok(movies);
        }

        /// <summary>
        ///     Sprawdza czy tytuł już istnieje w bazie danych
        /// </summary>
        /// <param name="title"></param>
        /// <returns>True, jeżeli istnieje; False jeżeli nie istnieje</returns>
        [NonAction]
        public bool MovieExists(string title)
        {
            var v = context.Movies.Where(a => a.Title == title).FirstOrDefault();
            return v != null;
        }

        [HttpGet]
        [Route("GetRating")]
        public ActionResult<double> GetRating(int id)
        {
            var movie = context.Movies.Where(e => e.Id == id).FirstOrDefault();
            var rating = movie.Rating;
            return rating;
        }
        [HttpPost]
        [Route("AddRating")]
        public ActionResult<float> AddRating(int rating, int id)
        {
            context.Rating.Add(new Rating
            {
                IdMovies = id,
                RatingNumber = rating
            });
            context.SaveChanges();
            var movie = context.Movies.Where(e => e.Id == id).FirstOrDefault();
            var newRating = RatingCounter(id);
            movie.Rating = newRating;
            context.SaveChanges();
            return newRating;
        }

        [HttpPost]
        [Route("UpdateMovie")]
        public ActionResult UpdateMovie(int id, string title, string description, string picture)
        {
            var movie = context.Movies.Where(e => e.Id == id).FirstOrDefault();

            if (title != movie.Title || description != movie.Description || picture != movie.Picture)
            {
                movie.Title = title;
                movie.Description = description;
                movie.Picture = picture;
                context.SaveChanges();
            }
          
           
            return Ok();
        }

        [HttpPost]
        [Route("DeleteMovie")]
        public ActionResult DeleteMovie(int id)
        {
           var movie = context.Movies.Where(e => e.Id == id).FirstOrDefault();

           if (movie != null)
            {
                context.Movies.Remove(movie);
                context.SaveChanges();
            }

            return Ok();
        }


        [NonAction]

        public float RatingCounter(int idMovie)
        {
            var rating = context.Rating.Where(e => e.IdMovies == idMovie).ToList();
            int ratingSum = 0;
            foreach (Rating r in rating)
            {
                ratingSum += r.RatingNumber;
            }
            int countRating = rating.Count();
            float newRating = (float)ratingSum / countRating;
            //var test1 = Math.Round(newRating * 2, MidpointRounding.AwayFromZero);
            //var test2 = test1 / 2;
            return newRating; 
        }
    }
}