using System;
using System.Collections.Generic;

namespace CinemaApi.Models
{
    public partial class Newsletter
    {
        public int IdNewsletter { get; set; }
        public int IdPersonalData { get; set; }

        public PersonalData IdPersonalDataNavigation { get; set; }
    }
}
