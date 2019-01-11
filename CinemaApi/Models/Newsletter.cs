using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Newsletter
    {
        public int IdNewsletter { get; set; }
        public int IdUserAccount { get; set; }

        public UserAccount IdUserAccountNavigation { get; set; }
    }
}
