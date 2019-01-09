using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class UserAccount
    {
        public UserAccount()
        {
            Newsletter = new HashSet<Newsletter>();
            Reservation = new HashSet<Reservation>();
            SigningIn = new HashSet<SigningIn>();
            UserRole = new HashSet<UserRole>();
        }

        public string Email { get; set; }
        public string UserPassword { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public int IdUserAccount { get; set; }

        public virtual ICollection<Newsletter> Newsletter { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
        public virtual ICollection<SigningIn> SigningIn { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}