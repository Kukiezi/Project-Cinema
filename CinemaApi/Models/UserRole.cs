using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class UserRole
    {
        public int IdUserRole { get; set; }
        public int IdUserAccount { get; set; }
        public int IdRoles { get; set; }

        public virtual Roles IdRolesNavigation { get; set; }
        public virtual UserAccount IdUserAccountNavigation { get; set; }
    }
}