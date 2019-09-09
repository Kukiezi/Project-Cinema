using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    public class CulturalEventsController : ControllerBase
    {
        private readonly CinemaDBContext context;

        public CulturalEventsController(CinemaDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        [Route("GetCulturalEvents")]
        public ActionResult GetCulturalEvents()
        {
            var culturaleventsList = context.CulturalEvent.ToList();
            if (culturaleventsList.Count != 0)
                return Ok(culturaleventsList);

            return NotFound();
        }

        [HttpGet]
        [Route("GetCulturalEvent")]
        public ActionResult<CulturalEvent> GetCulturalEventMovie(int IdCulturalEvent)
        {
            var culturalevent = context.CulturalEvent.Where(a => a.IdCulturalEvent == IdCulturalEvent).FirstOrDefault();

            if (culturalevent != null)
            {
                return culturalevent;
            }

            return NotFound();
        }
     /*   [HttpGet]
        [Route("GetEventsByUser")]
        public ActionResult<List<CulturalEvent>> GetEventsByUser(string IdUser)
        {
            var signIn = context.SigningIn.Where(a => a.IdUsers == IdUser).FirstOrDefault();
            var events = context.CulturalEvent.Where(a => a.IdCulturalEvent == signIn.IdCulturalEvent).ToList();

            return events;

        } */
        [HttpPost]
        [Route("AddCulturalEvent")]
        public ActionResult AddCulturalEvents(CulturalEvent culturalevents)
        {
            context.CulturalEvent.Add(new CulturalEvent
            {
                EventName = culturalevents.EventName,
                EventDescription = culturalevents.EventDescription,
                EventDate = culturalevents.EventDate,
                SeatsLimit = culturalevents.SeatsLimit
            });

            var culturaleventExist = CulturalEventExists(culturalevents.EventName);
            if (culturaleventExist)
                return Ok("EVENT ALREADY EXISTS");

            context.SaveChanges();
            return Ok(culturalevents);
        }
        [HttpPost]
        [Route("AddEvent")]
        public ActionResult AddEvent(string eventName, string eventDescription, DateTime eventDate, int seatsLimit)
        {
            context.CulturalEvent.Add(new CulturalEvent
            {
                EventName = eventName,
                EventDescription = eventDescription,
                EventDate = eventDate,
                IdEventAddress = 1,
                SeatsLimit = seatsLimit
            });

            var culturaleventExist = CulturalEventExists(eventName);
            if (culturaleventExist)
                return Ok("EVENT ALREADY EXISTS");

            context.SaveChanges();
            return Ok();
        }
        [NonAction]
        public bool CulturalEventExists(string event_name)
        {
            var v = context.CulturalEvent.Where(a => a.EventName == event_name).FirstOrDefault();
            return v != null;
        }

        [HttpPost]
        [Route("UpdateCulturalEvent")]
        public ActionResult UpdateCulturalEvent(int id, string eventName, string eventDescription, DateTime eventDate, int seatsLimit)
        {
            var culturalevent = context.CulturalEvent.Where(e => e.IdCulturalEvent == id).FirstOrDefault();

            if (eventName != culturalevent.EventName || eventDescription != culturalevent.EventDescription || seatsLimit != culturalevent.SeatsLimit)
            {
                culturalevent.EventName = eventName;
                culturalevent.EventDescription = eventDescription;
                culturalevent.EventDate = eventDate;
                culturalevent.SeatsLimit = seatsLimit;
                context.SaveChanges();
            }


            return Ok();
        }
        [HttpPost]
        [Route("ReduceSeats")]
        public ActionResult ReduceSeats(int id)
        {
            var culturalevent = context.CulturalEvent.Where(e => e.IdCulturalEvent == id).FirstOrDefault();

                culturalevent.SeatsLimit --;
                context.SaveChanges();
           
            return Ok();
        }
        [HttpPost]
        [Route("DeleteCulturalEvent")]
        public ActionResult DeleteCulturalEvent(int id)
        {
            var culturalevent = context.CulturalEvent.Where(e => e.IdCulturalEvent == id).FirstOrDefault();

            if (culturalevent != null)
            {
                context.CulturalEvent.Remove(culturalevent);
                context.SaveChanges();
            }

            return Ok();
        }

        [HttpGet]
        [Route("AddSignFor")]
        public ActionResult AddSignFor(int idEvent, string idUser)
        {
            context.SigningIn.Add(new SigningIn
            {
                IdCulturalEvent = idEvent,
                IdUsers = idUser,
                Confirmed = false
            });
            context.SaveChanges();
            ReduceSeats(idEvent);
            var user = context.Users.Where(e => e.Id == idUser).FirstOrDefault();
            SendMail(idUser, user.Email, user.FirstName);
            return Ok();
        }

        [HttpGet]
        [Route("ConfirmSignFor")]
        public ActionResult ConfirmSignFor(string id)
        {
            var sign = context.SigningIn.Where(a => a.IdUsers == id).FirstOrDefault();
            sign.Confirmed = true;
            context.SaveChanges();

            return Ok();

        }

        [HttpGet]
        [Route("SendMail")]
        public void SendMail(string id, string email, string name)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Kino", "kinostudyjne97@gmail.com"));
            message.To.Add(new MailboxAddress(name, email));
            message.Subject = "Potwierdzenie rezerwacji";
            message.Body = new TextPart("plain")
            {
                Text = @"http://localhost:3000/ConfirmCulturalEvent/" + id
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