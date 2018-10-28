using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class SeatReservation
    {
        public int IdSeat { get; set; }
        public int IdReservation { get; set; }

        public Reservation IdReservationNavigation { get; set; }
        public Seat IdSeatNavigation { get; set; }
    }
}
