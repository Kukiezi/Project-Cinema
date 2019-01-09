using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class CulturalEvent
    {
        public CulturalEvent()
        {
            SigningIn = new HashSet<SigningIn>();
        }

        public string EventName { get; set; }
        public string EventDescription { get; set; }
        public DateTime EventDate { get; set; }
        public int SeatsLimit { get; set; }
        public int IdCulturalEvent { get; set; }
        public int IdEventAddress { get; set; }

        public virtual EventAddress IdEventAddressNavigation { get; set; }
        public virtual ICollection<SigningIn> SigningIn { get; set; }
    }
}