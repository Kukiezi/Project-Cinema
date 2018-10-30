using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class PersonalData
    {
        public PersonalData()
        {
            Newsletter = new HashSet<Newsletter>();
            Reservation = new HashSet<Reservation>();
            SigningIn = new HashSet<SigningIn>();
        }

        public int IdPersonalData { get; set; }
        public string ClientName { get; set; }
        public string ClientSurname { get; set; }

        public ICollection<Newsletter> Newsletter { get; set; }
        public ICollection<Reservation> Reservation { get; set; }
        public ICollection<SigningIn> SigningIn { get; set; }
    }
}
