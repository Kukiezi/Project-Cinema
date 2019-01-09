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

        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
        public int IdRoles { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}