using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using Microsoft.AspNetCore.Mvc;

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

        [NonAction]
        public bool CulturalEventExists(string event_name)
        {
            var v = context.CulturalEvent.Where(a => a.EventName == event_name).FirstOrDefault();
            return v != null;
        }


    }
}