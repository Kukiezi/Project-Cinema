using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Reservation
    {
        public int IdReservation { get; set; }
        public int IdUserAccount { get; set; }
        public int IdScreening { get; set; }
        public string SeatsReserved { get; set; }

        public virtual Screening IdScreeningNavigation { get; set; }
        public virtual UserAccount IdUserAccountNavigation { get; set; }
    }
}