using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using CinemaApi.Models.WeekModel;
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
        [Route("GetAllScreenings")]
        public ActionResult GetAllScreenings()
        {
            var screeningsList = context.Screening.ToList();
            if (screeningsList.Count != 0)
                return Ok(screeningsList);

            return NotFound();
        }
        [HttpGet]
        [Route("GetScreenings")]
        public ActionResult<WeekModel> GetScreening()
        {
            DateTime Day0 = DateTime.Now;
            DateTime Day1 = DateTime.Now;
            DateTime Day2 = Day1.AddDays(0);
            DateTime Day3 = Day1.AddDays(1);
            DateTime Day4 = Day1.AddDays(2);
            DateTime Day5 = Day1.AddDays(3);
            DateTime Day6 = Day1.AddDays(4);
            DateTime Day7 = Day1.AddDays(5);

            /*var screeningsList = context.Screening.Where(a => a.ScreeningDate >= Day1 && a.ScreeningDate < Day2).ToList();*/
          
            var screeningsList = context.Screening.ToList();
        
        
            List<ScreeningExt> screeningsExtList = new List<ScreeningExt>();
            List<List<ScreeningExt>> list = new List<List<ScreeningExt>>();
            List<ScreeningExt> day1 = new List<ScreeningExt>();
            List<ScreeningExt> day2 = new List<ScreeningExt>();
            List<ScreeningExt> day3 = new List<ScreeningExt>();
            List<ScreeningExt> day4 = new List<ScreeningExt>();
            List<ScreeningExt> day5 = new List<ScreeningExt>();
            List<ScreeningExt> day6 = new List<ScreeningExt>();
           
            foreach (var item in screeningsList)
            {
                ScreeningExt ext = new ScreeningExt
                {
                    IdMovies = item.IdMovies,
                    IdRoom = item.IdRoom,
                    IdScreening = item.IdScreening,
                    ScreeningDate = item.ScreeningDate,
                    MovieName = item.MovieName,
                    showtime1 = item.showtime1,
                    showtime2 = item.showtime2,
                    showtime3 = item.showtime3

                };

                if (item.ScreeningDate >= Day1 && item.ScreeningDate < Day2)
                {
                    day1.Add(ext);
                }
                else if (item.ScreeningDate >= Day2 && item.ScreeningDate < Day3)
                {
                    day2.Add(ext);
                }
                else if (item.ScreeningDate >= Day3 && item.ScreeningDate < Day4)
                {
                    day3.Add(ext);
                }
                else if (item.ScreeningDate >= Day4 && item.ScreeningDate < Day5)
                {
                    day4.Add(ext);
                }
                else if (item.ScreeningDate >= Day5 && item.ScreeningDate < Day6)
                {
                    day5.Add(ext);
                }
                else if (item.ScreeningDate >= Day6)
                {
                    day6.Add(ext);
                }
                //screeningsExtList.Add(ext);
            }

            list.Add(day1);
            list.Add(day2);
            list.Add(day3);
            list.Add(day4);
            list.Add(day5);
            list.Add(day6);
            WeekModel week = new WeekModel
            {
                Day1 = day1,
                Day2 = day2,
                Day3 = day3,
                Day4 = day4,
                Day5 = day5,
                Day6 = day6
            };
            

            if (list.Count != 0)
                return Ok(week);

            return NotFound();
        }
        [HttpGet]
        [Route("GetScreeningMovie")]
        public ActionResult<WeekModel> GetScreeningMovie(int id)
        {
            DateTime Day0 = DateTime.Now;
            DateTime Day1 = new DateTime(2019, 1, 22);
            DateTime Day2 = Day1.AddDays(1);
            DateTime Day3 = Day1.AddDays(2);
            DateTime Day4 = Day1.AddDays(3);
            DateTime Day5 = Day1.AddDays(4);
            DateTime Day6 = Day1.AddDays(5);
            DateTime Day7 = Day1.AddDays(6);

            /*var screeningsList = context.Screening.Where(a => a.ScreeningDate >= Day1 && a.ScreeningDate < Day2).ToList();*/

            var screeningsList = context.Screening.Where(a => a.IdMovies == id).ToList();
            List<ScreeningExt> screeningsExtList = new List<ScreeningExt>();

            List<List<ScreeningExt>> list = new List<List<ScreeningExt>>();
            List<ScreeningExt> day1 = new List<ScreeningExt>();
            List<ScreeningExt> day2 = new List<ScreeningExt>();
            List<ScreeningExt> day3 = new List<ScreeningExt>();
            List<ScreeningExt> day4 = new List<ScreeningExt>();
            List<ScreeningExt> day5 = new List<ScreeningExt>();
            List<ScreeningExt> day6 = new List<ScreeningExt>();

            foreach (var item in screeningsList)
            {
                ScreeningExt ext = new ScreeningExt
                {
                    IdMovies = item.IdMovies,
                    IdRoom = item.IdRoom,
                    IdScreening = item.IdScreening,
                    ScreeningDate = item.ScreeningDate,
                    MovieName = item.MovieName,
                    showtime1 = item.showtime1,
                    showtime2 = item.showtime2,
                    showtime3 = item.showtime3

                };

                if (item.ScreeningDate >= Day1 && item.ScreeningDate < Day2)
                {
                    day1.Add(ext);
                }
                else if (item.ScreeningDate >= Day2 && item.ScreeningDate < Day3)
                {
                    day2.Add(ext);
                }
                else if (item.ScreeningDate >= Day3 && item.ScreeningDate < Day4)
                {
                    day3.Add(ext);
                }
                else if (item.ScreeningDate >= Day4 && item.ScreeningDate < Day5)
                {
                    day4.Add(ext);
                }
                else if (item.ScreeningDate >= Day5 && item.ScreeningDate < Day6)
                {
                    day5.Add(ext);
                }
                else if (item.ScreeningDate >= Day6)
                {
                    day6.Add(ext);
                }
                //screeningsExtList.Add(ext);
            }
            list.Add(day1);
            list.Add(day2);
            list.Add(day3);
            list.Add(day4);
            list.Add(day5);
            list.Add(day6);
            WeekModel week = new WeekModel
            {
                Day1 = day1,
                Day2 = day2,
                Day3 = day3,
                Day4 = day4,
                Day5 = day5,
                Day6 = day6
            };


            if (list.Count != 0)
                return Ok(week);

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
        public bool ScreeningExists(string title)
        {
            var v = context.Screening.Where(a => a.MovieName == title).FirstOrDefault();
            return v != null;
        }
        [Route("AddScreenings")]
        [HttpPost]
        public ActionResult AddScreenings(int idMovie, int idRoom, string movieName, DateTime screeningDate, string showTime1, string showTime2, string showTime3)
        {
            TimeSpan time1 = TimeSpan.Parse(showTime1);
            TimeSpan time2 = TimeSpan.Parse(showTime2);
            TimeSpan time3 = TimeSpan.Parse(showTime3);
            context.Screening.Add(new Screening
              {
                  MovieName = movieName,
                  IdMovies = idMovie,
                  IdRoom = idRoom,
                  ScreeningDate = screeningDate,
                  showtime1 = time1,
                  showtime2 = time2,
                  showtime3 = time3

            });

            var movieExist = ScreeningExists(movieName);
            if (movieExist)
                return Ok("MOVIE ALREADY EXISTS");

            context.SaveChanges();
            return Ok(); 
            
            
        }
        [HttpPost]
        [Route("DeleteScreening")]
        public ActionResult DeleteScreening(int id)
        {
            var screening = context.Screening.Where(e => e.IdScreening == id).FirstOrDefault();

            if (screening != null)
            {
                context.Screening.Remove(screening);
                context.SaveChanges();
            }

            return Ok();
        }
        [HttpGet]
        [Route("GetScreening")]
        public ActionResult<Screening> GetScreening(int id)
        {
            var movie = context.Screening.Where(a => a.IdScreening == id).FirstOrDefault();

            if (movie != null)
            {
                return movie;
            }

            return NotFound();
        }
        [Route("EditScreenings")]
        [HttpPost]
        public ActionResult EditScreenings(int idScreening, int idMovie, int idRoom, string movieName, DateTime screeningDate, string showTime1, string showTime2, string showTime3)
        {
            var screening = context.Screening.Where(e => e.IdScreening == idScreening).FirstOrDefault();
            TimeSpan time1 = TimeSpan.Parse(showTime1);
            TimeSpan time2 = TimeSpan.Parse(showTime2);
            TimeSpan time3 = TimeSpan.Parse(showTime3);

            screening.MovieName = movieName;
            screening.IdMovies = idMovie;
            screening.IdRoom = idRoom;
            screening.ScreeningDate = screeningDate;
            screening.showtime1 = time1;
            screening.showtime2 = time2;
            screening.showtime3 = time3;
            context.SaveChanges();

            return Ok();


        }
        [NonAction]
        public bool ScreeningExists(int idScreening)
        {
            var v = context.Screening.Where(a => a.IdScreening == idScreening).FirstOrDefault();
            return v != null;
        }


    }
}