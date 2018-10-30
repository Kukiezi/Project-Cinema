using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Roles
    {
        public Roles()
        {
            UserRole = new HashSet<UserRole>();
        }

        public int IdRoles { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }

        public ICollection<UserRole> UserRole { get; set; }
    }
}
