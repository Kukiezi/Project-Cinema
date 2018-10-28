using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Room
    {
        public Room()
        {
            Screening = new HashSet<Screening>();
        }

        public int IdRoom { get; set; }
        public int RoomNumber { get; set; }
        public int IdSeat { get; set; }

        public Seat IdSeatNavigation { get; set; }
        public ICollection<Screening> Screening { get; set; }
    }
}
