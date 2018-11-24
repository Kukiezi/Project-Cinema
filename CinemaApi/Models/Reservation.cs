using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Reservation
    {
        public Reservation()
        {
            SeatReservation = new HashSet<SeatReservation>();
        }

        public int IdReservation { get; set; }
        public int IdUserAccount { get; set; }
        public int IdScreening { get; set; }

        public Screening IdScreeningNavigation { get; set; }
        public UserAccount IdUserAccountNavigation { get; set; }
        public ICollection<SeatReservation> SeatReservation { get; set; }
    }
}
