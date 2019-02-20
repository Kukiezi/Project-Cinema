using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApi.Models.UserModels
{
    public class UserProfileDetailsApiModel
    {
        #region Public Properties

       
        /// <summary>
        /// Role of the current user
        /// </summary>
        /// <remarks>Sends Role of the current user</remarks>
        public string Role { get; set; }

        /// <summary>
        /// The authentication token used to stay authenticated through future requests
        /// </summary>
        /// <remarks>The Token is only provided when called from the login methods</remarks>
        public string Token { get; set; }

        /// <summary>
        /// The users id
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The users first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// The users last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// The users username
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// The users email
        /// </summary>
        public string Email { get; set; }

        #endregion

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public UserProfileDetailsApiModel()
        {

        }

        #endregion

        #region Public Helper Methods

        /// <summary>
        /// Creates a new <see cref="LoginCredentialsDataModel"/>
        /// from this model
        /// </summary>
        /// <returns></returns>
        public LoginCredentialsDataModel ToLoginCredentialsDataModel()
        {
            return new LoginCredentialsDataModel
            {
                Id = Id,
                Email = Email,
                FirstName = FirstName,
                LastName = LastName,
                Username = Username,
                Token = Token
            };
        }

        #endregion
    }
}
