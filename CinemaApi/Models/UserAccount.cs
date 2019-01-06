using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace CinemaApi.Models
{
    public partial class UserAccount : IdentityUser
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

        public ICollection<Newsletter> Newsletter { get; set; }
        public ICollection<Reservation> Reservation { get; set; }
        public ICollection<SigningIn> SigningIn { get; set; }
        public ICollection<UserRole> UserRole { get; set; }
    }
}
