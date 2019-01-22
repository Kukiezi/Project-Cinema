using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models.UserModels
{
    public class UpdateUserProfileApiModel
    {
        #region Public Properties

        public string Id { get; set; }
        /// <summary>
        /// The users username
        /// </summary>
        public string Username { get; set; }


        /// <summary>
        /// The users first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// The users last name
        /// </summary>
        public string LastName { get; set; }

        #endregion

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public UpdateUserProfileApiModel()
        {

        }

        #endregion
    }
}
