using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CinemaApi.Models;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    [ApiController]
    public class ReserveTicketController : ControllerBase
    {
        private readonly CinemaDBContext context;

        public ReserveTicketController(CinemaDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("GetSeats")]
        public ActionResult GetSeats()
        {
            var seatList = context.Seat.ToList();
            if (seatList.Count != 0)
                return Ok(seatList);

            return NotFound();
        }
        [HttpGet]
        [Route("GetSeat")]
        public ActionResult<Seat> GetSeat(int idSeat)
        {
            var seat = context.Seat.Where(a => a.IdSeat == idSeat).FirstOrDefault();

            if (seat != null)
            {
                return seat;
            }

            return NotFound();
        }
        [HttpGet]
        [Route("AddSeat")]
        public ActionResult<int> AddSeat(int reservation, int seat)
        {
            context.SeatReservation.Add(new SeatReservation
            {
                IdSeat = seat,
                IdReservation = reservation
               

            });
            context.SaveChanges();

            return reservation;
        }

    }
}