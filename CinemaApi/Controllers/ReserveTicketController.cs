﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CinemaApi.Models;
using System.Text.RegularExpressions;
using MimeKit;
using MailKit.Net.Smtp;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    [ApiController]
    public class ReserveTicketController : ControllerBase
    {
        private readonly CinemaDBContext context;
        static List<string> Reservation = new List<string>();

        public ReserveTicketController(CinemaDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("GetRooms")]
        public ActionResult GetRooms()
        {
            var roomsList = context.Room.ToList();
            if (roomsList.Count != 0)
                return Ok(roomsList);

            return NotFound();
        }
        [HttpGet]
        [Route("GetSeat2")]
        public ActionResult GetSeat2(string mask)
        {
            List<string> s = ReservedSeats(mask);
            if (s.Count != 0)
            {
                return Ok(s);
            }
            return NotFound();

        }
        [HttpGet]
        [Route("GetLayout")]
        public List<string> GetLayout(int id)
        {
            var room = context.Screening.Where(a => a.IdScreening == id).Select(a => a.IdRoom).FirstOrDefault();
            List<string> layout = new List<string>
            {
                context.Room.Where(a => a.IdRoom == room).Select(a => a.Layout).FirstOrDefault()
            };
            return layout;

        }
        [HttpGet]
        [Route("GetUser")]
        public ApplicationUser GetUser(string id)
        {
            var user = context.Users.Where(a => a.Id == id).FirstOrDefault();
            return user;

        }

        [HttpGet]
        [Route("GetMovieInfo")]
        public List<string> GetMovieInfo(int id)
        {
            var screening = context.Screening.Where(a => a.IdScreening == id).FirstOrDefault();

            List<string> movie = new List<string>
            {
                context.Movies.Where(a => a.Id == screening.IdMovies).Select(a => a.Title).FirstOrDefault()
        };
            return movie;

        }
        [HttpPost]
        [Route("AddReservation")]
        public ActionResult AddReservation(string user, int screening, string seat, TimeSpan time)
        {
            context.Reservation.Add(new Reservation
            {

                IdUser = user,
                IdScreening = screening,
                SeatsReserved = seat,
                Showtime = time,
                Confirmed = false
                
            });
            context.SaveChanges();
            var reservation = context.Reservation.Where(a => a.IdScreening == screening && a.SeatsReserved ==seat).FirstOrDefault();
            var users = context.Users.Where(a => a.Id == user).FirstOrDefault();
            //SendMail(reservation.IdReservation, users.Email, users.FirstName);
            return Ok();

        }

        [HttpGet]
        [Route("ConfirmReservation")]
        public ActionResult ConfirmReservation(int id)
        {
            var reservation = context.Reservation.Where(a => a.IdReservation == id).FirstOrDefault();
            reservation.Confirmed = true;
            context.SaveChanges();

            return Ok();

        }

        [HttpGet]
        [Route("MapRoom")]
        public ActionResult MapRoom(string mask, int id, TimeSpan time)
        {
            List<string> s = MapSeats(mask);
            List<string> t = MapSeatsTaken(id, time);
            for (int i = 0; i < s.Count; i++)
            {
                for (int j = 0; j < t.Count; j++)
                {
                    if (s[i] == t[j])
                    {
                        s[i] = "Taken";
                    }
                }
            }
            if (s.Count != 0)
            {
                return Ok(s);
            }
            return NotFound();
        }
        [NonAction]

        public List<string> ReservedSeats(string mask)
        {
            Match match = Regex.Match(mask, @"[A-K]\d+");
            int matches = Regex.Matches(mask, @"[A-K]\d+").Count;
            List<string> s = new List<string>();
            for (int i = 1; i <= matches; i++)
            {
                s.Add(match.Value);
                match = match.NextMatch();

            }
            return s;
        }
        [NonAction]

        public List<string> MapSeats(string mask)
        {
            Match match = Regex.Match(mask, @"[A-K]\d*[P]*\d*[P]*\d*[Q]");
            int matches = Regex.Matches(mask, @"[A-K]\d+").Count;
            int seats = 0;
            char[] breaks;
            List<string> s = new List<string>();
            for (int i = 1; i <= matches; i++)
            {
                int x = 1;
                string mask2 = match.Value;
                var Row = Regex.Match(mask2, @"[A-K]");
                var End = Regex.Match(mask2, @"[Q]");
                var Number = Regex.Matches(mask2, @"\d+")
                .OfType<Match>()
                .Select(m => m.Groups[0].Value)
                .ToArray();
                var Space = Regex.Matches(mask2, @"[P]+")
                .OfType<Match>()
                .Select(m => m.Groups[0].Value)
                .ToArray();
                for (int j = 0; j < Number.Length; j++)
                {
                    Int32.TryParse(Number[j], out seats);
                    for (int z = 1; z <= seats; z++)
                    {
                        s.Add(Row.Value + x);
                        x++;
                    }
                    if (j != Number.Length - 1)
                    {
                        breaks = Space[j].ToCharArray();
                        for (int k = 0; k < breaks.Length; k++)
                        {
                            s.Add("P");
                        }
                    }


                }
                s.Add("Q");
                x = 1;
                match = match.NextMatch();

            }
            return s;
        }
        [NonAction]

        public List<string> MapSeatsTaken(int id, TimeSpan time)
        {
            //List<string> reservations = new List<string>();
            string reservations="";
           // var seats = context.Reservation.Where(a => a.IdScreening == 3).ToList();
            List<string> seats = context.Reservation.Where(a => a.IdScreening == id && a.Showtime == time).Select(a=>a.SeatsReserved).ToList();
            foreach(string element in seats )
            {
                reservations += element;
            }
            
            List<string> s = ReservedSeats(reservations);
            return s;
            
        }
        [HttpGet]
        [Route("SendMail")]
        public void SendMail(int id, string email, string name)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Kino", "kinostudyjne97@gmail.com"));
            message.To.Add(new MailboxAddress(name, email));
            message.Subject = "Potwierdzenie rezerwacji";
            message.Body = new TextPart("plain")
            {
                Text = @"http://localhost:3000/ConfirmReservation/" + id 
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587);
                client.Authenticate("kinostudyjne97@gmail.com", "Kinostudyjne1");
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}