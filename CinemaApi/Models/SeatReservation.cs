using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class SeatReservation
    {
        public int IdSeatReservation { get; set; }
        public int IdSeat { get; set; }

        public Seat IdSeatNavigation { get; set; }
    }
}
