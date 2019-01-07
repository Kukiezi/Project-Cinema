using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models.UserModels
{
    public class RegisterCredentialsApiModel
    {
        #region Public Properties

        /// <summary>
        /// The users username
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// The users email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The users first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// The users last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// The users password
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// The users confirm password
        /// </summary>
        public string ConfirmPassword { get; set; }
        #endregion

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public RegisterCredentialsApiModel()
        {

        }

        #endregion
    }
}
