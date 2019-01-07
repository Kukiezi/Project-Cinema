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
            var screeningsList = context.Screening.ToList();
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