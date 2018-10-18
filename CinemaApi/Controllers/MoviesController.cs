using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Data;
using CinemaApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        /// <summary>
        /// Metoda dostaje Get request z Front-endu i oddaje filmy z bazy danych jako JSON
        /// </summary>
        /// <returns>Filmy z bazy dasnych; Wiadomość jeżeli nie ma filmów</returns>
        [Route("GetMovies")]
        public ActionResult GetMovies()
        {
            var movielol = "x";
            using (var context = new CinemaDbContext())
            {
                var movie = context.Movies.Where(m => m.Id == 1).FirstOrDefault();
                if (movie != null)
                {
                    var movies = new List<MoviesDataModel>
                    {
                        new MoviesDataModel
                        {
                            Title = movie.Title,
                            Description = movie.Description
                        }
                    };
                    return Ok(movies);
                }
      
            }

            return NotFound();

        }

        /// <summary>
        /// Metoda dostaje Get request z Front-endu i oddaje filmy z bazy danych jako JSON
        /// </summary>
        /// <param name="movies"></param>
        /// <returns>Dodane filmy; Wiadomość jeżeli nie zostały dodane z jakiegoś powodu</returns>
        [Route("AddMovie")]
        [HttpPost]
        public ActionResult AddMovies(MoviesDataModel movies)
        {
            using (var context = new CinemaDbContext())
            {
               
                context.Movies.Add(new MoviesDataModel
                {
                    Title = movies.Title,
                    Description = movies.Description
                });

                var movieExist = MovieExists(movies.Title);
                if (movieExist)
                {
                    // ADD RETURN MSG THAT MOVIE DOESNT EXIST
                    return Ok("MOVIE ALREADY EXISTS");
                }

                else
                context.SaveChanges();
                return Ok(movies);
            }

        }

        /// <summary>
        /// Sprawdza czy tytuł już istnieje w bazie danych
        /// </summary>
        /// <param name="title"></param>
        /// <returns>True, jeżeli istnieje; False jeżeli nie istnieje</returns>
        [NonAction]
        public bool MovieExists(string title)
        {
            using (var context = new CinemaDbContext())
            {
                var v = context.Movies.Where(a => a.Title == title).FirstOrDefault();
                return v != null;
            }
        }
    }
}