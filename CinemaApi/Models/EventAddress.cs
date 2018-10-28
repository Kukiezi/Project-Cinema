using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class EventAddress
    {
        public EventAddress()
        {
            CulturalEvent = new HashSet<CulturalEvent>();
        }

        public int IdEventAddress { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }

        public ICollection<CulturalEvent> CulturalEvent { get; set; }
    }
}
