using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class UserAccount
    {
        public UserAccount()
        {
            UserRole = new HashSet<UserRole>();
        }

        public int IdUserAccount { get; set; }
        public string Email { get; set; }
        public string UserPassword { get; set; }
        public int IdUserRole { get; set; }

        public ICollection<UserRole> UserRole { get; set; }
    }
}
