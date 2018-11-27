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
        public ActionResult<SeatReservation> GetSeat(int reservation)
        {
            var seatList = context.SeatReservation.Where(a => a.IdReservation == reservation).ToList();

            if (seatList.Count != 0)
            {
                return Ok(seatList);
            }

            return NotFound();
        }
        [HttpGet]
        [Route("GetReserved")]
        public ActionResult<Seat> GetReserved(int idSeat)
        {
            var seatList = context.Seat.Where(a => a.IdSeat == idSeat).ToList();

            if (seatList.Count != 0)
            {
                return Ok(seatList);
            }

            return NotFound();
        }
        [HttpPost]
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
        [HttpGet]
        [Route("RemoveSeat")]
        public ActionResult RemoveSeat(int reservation, int seat)
        {
            var rm = context.SeatReservation.Where(a => a.IdReservation==reservation && a.IdSeat == seat).FirstOrDefault();

            if(rm != null)
            {
                context.SeatReservation.Remove(rm);
            }
            context.SaveChanges();

            return Ok(seat);
        }
    }
}