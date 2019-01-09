using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class SigningIn
    {
        public int IdSigningIn { get; set; }
        public int IdCulturalEvent { get; set; }
        public int IdUserAccount { get; set; }

        public virtual CulturalEvent IdCulturalEventNavigation { get; set; }
        public virtual UserAccount IdUserAccountNavigation { get; set; }
    }
}