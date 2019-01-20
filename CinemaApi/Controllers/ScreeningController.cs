using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    public class ScreeningController : ControllerBase
    {
        private readonly CinemaDBContext context;

        public ScreeningController(CinemaDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        [Route("GetScreenings")]
        public ActionResult GetScreening()
        {
            /*DateTime Day1 = DateTime.Now;
            DateTime Day2 = Day1.AddDays(1);
            DateTime Day3 = Day1.AddDays(2);
            DateTime Day4 = Day1.AddDays(3);
            DateTime Day5 = Day1.AddDays(4);
            DateTime Day6 = Day1.AddDays(5);
            DateTime Day7 = Day1.AddDays(6);

            var screeningsList = context.Screening.Where(a => a.ScreeningDate >= Day1 && a.ScreeningDate < Day2).ToList();*/

            var screeningsList = context.Screening.ToList();

            foreach (var item in screeningsList)
            {
                ScreeningExt ext = new ScreeningExt
                {
                    IdMovies = item.IdMovies,
                    IdRoom = item.IdRoom,
                    IdScreening = item.IdScreening,
                    ScreeningDate = item.ScreeningDate,
                    MovieName = context.Movies.Where(a => a.Id == item.IdMovies).FirstOrDefault().Title
                };
            }

            if (screeningsList.Count != 0)
                return Ok(screeningsList);

            return NotFound();
        }

        [HttpGet]
        [Route("Screening")]
        public ActionResult<Screening> GetScreeningMovie(int IdScreening)
        {
            var screening = context.Screening.Where(a => a.IdScreening == IdScreening).FirstOrDefault();

            if (screening != null)
            {
                return screening;
            }

            return NotFound();
        }

        [HttpPost]
        [Route("AddScreening")]
        public ActionResult AddScreening(Screening screenings)
        {
            context.Screening.Add(new Screening
            {
                ScreeningDate = screenings.ScreeningDate
            });

            var screeningExist = ScreeningExists(screenings.IdScreening);
            if (screeningExist)
                return Ok("SCREENING ALREADY EXISTS");

            context.SaveChanges();
            return Ok(screenings);
        }

        [NonAction]
        public bool ScreeningExists(int idScreening)
        {
            var v = context.Screening.Where(a => a.IdScreening == idScreening).FirstOrDefault();
            return v != null;
        }


    }
}