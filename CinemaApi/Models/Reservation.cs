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
        public int IdPersonalData { get; set; }

        public PersonalData IdPersonalDataNavigation { get; set; }
        public ICollection<SeatReservation> SeatReservation { get; set; }
    }
}
