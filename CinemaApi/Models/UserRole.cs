using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class UserRole
    {
        public int IdUserRole { get; set; }
        public int IdUserAccount { get; set; }
        public int IdRoles { get; set; }

        public Roles IdRolesNavigation { get; set; }
        public UserAccount IdUserAccountNavigation { get; set; }
    }
}
