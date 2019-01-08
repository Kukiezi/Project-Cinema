using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using CinemaApi.Models.Error;
using CinemaApi.Models.Tokens;
using CinemaApi.Models.UserModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApi.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserapiController : ControllerBase
    {

        #region Protected Members

        /// <summary>
        /// The scoped Application context
        /// </summary>
        protected CinemaDBContext mContext;

        /// <summary>
        /// The manager for handling user creation, deletion, searching, roles etc...
        /// </summary>
        protected UserManager<ApplicationUser> mUserManager;

        /// <summary>
        /// The manager for handling signing in and out for our users
        /// </summary>
        protected SignInManager<ApplicationUser> mSignInManager;

        #endregion

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="context">The injected context</param>
        /// <param name="signInManager">The Identity sign in manager</param>
        /// <param name="userManager">The Identity user manager</param>
        public UserapiController(
            CinemaDBContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            mContext = context;
            mUserManager = userManager;
            mSignInManager = signInManager;
        }

        #endregion



        /// <summary>
        /// Tries to register for a new account on the server
        /// </summary>
        /// <param name="registerCredentials">The registration details</param>
        /// <returns>Returns the result of the register request</returns>
        [AllowAnonymous]
        [Route("register")]
        public async Task<ApiResponse<RegisterResultApiModel>> RegisterAsync(
            [FromBody] RegisterCredentialsApiModel registerCredentials)
        {
            // TODO: Localize all strings
            // The message when we fail to login
            var invalidErrorMessage = "Prosze wypełnić wszystkie pola do zarejestrowania się";
            var invalidConfirmPassword = "Hasło i Powtórz Hasło nie zgadzają się ze sobą";
            // The error response for a failed login
            var errorResponse = new ApiResponse<RegisterResultApiModel>
            {
                // Set error message
                ErrorMessage = invalidErrorMessage
            };

            var errorResponse2 = new ApiResponse<RegisterResultApiModel>
            {
                // Set error message
                ErrorMessage = invalidConfirmPassword
            };

            // If we have no credentials...
            if (registerCredentials == null)
                // Return failed response
                return errorResponse;

            // Make sure we have a user name
            if (string.IsNullOrWhiteSpace(registerCredentials.Username) || string.IsNullOrWhiteSpace(registerCredentials.FirstName) || string.IsNullOrWhiteSpace(registerCredentials.LastName) || string.IsNullOrWhiteSpace(registerCredentials.Password) || string.IsNullOrWhiteSpace(registerCredentials.Email))
                // Return error message to user
                return errorResponse;

            if (registerCredentials.Password != registerCredentials.ConfirmPassword)
                return errorResponse2;

            // Create the desired user from the given details
            var user = new ApplicationUser
            {
                UserName = registerCredentials.Username,
                FirstName = registerCredentials.FirstName,
                LastName = registerCredentials.LastName,
                Email = registerCredentials.Email
            };

            // Try and create a user
            var result = await mUserManager.CreateAsync(user, registerCredentials.Password);

            // If the registration was successful...
            if (result.Succeeded)
            {
                // Get the user details
                var userIdentity = await mUserManager.FindByNameAsync(user.UserName);

                // Send email verification
                //await SendUserEmailVerificationAsync(user);

                // Return valid response containing all users details
                return new ApiResponse<RegisterResultApiModel>
                {
                    Response = new RegisterResultApiModel
                    {
                        FirstName = userIdentity.FirstName,
                        LastName = userIdentity.LastName,
                        Email = userIdentity.Email,
                        Username = userIdentity.UserName,
                        Token = userIdentity.GenerateJwtToken(),
                    }
                };
            }
            // Otherwise if it failed...
            else
                // Return the failed response
                return new ApiResponse<RegisterResultApiModel>
                {
                    // Aggregate all errors into a single error string
                    ErrorMessage = result.Errors.AggregateErrors()
                };
        }

        /// <summary>
        /// Logs in a user using token-based authentication
        /// </summary>
        /// <returns>Returns the result of the login request</returns>
        [AllowAnonymous]
        [Route("login")]
        public async Task<ApiResponse<UserProfileDetailsApiModel>> LogInAsync(
            [FromBody] LoginCredentialsApiModel loginCredentials)
        {
            // TODO: Localize all strings
            // The message when we fail to login
            var invalidErrorMessage = "Niepoprawny login lub hasło";

            // The error response for a failed login
            var errorResponse = new ApiResponse<UserProfileDetailsApiModel>
            {
                // Set error message
                ErrorMessage = invalidErrorMessage
            };

            // Make sure we have a user name
            if (loginCredentials?.UsernameOrEmail == null ||
                string.IsNullOrWhiteSpace(loginCredentials.UsernameOrEmail))
                // Return error message to user
                return errorResponse;

            // Validate if the user credentials are correct...

            // Is it an email?
            var isEmail = loginCredentials.UsernameOrEmail.Contains("@");

            // Get the user details
            var user = isEmail
                ?
                // Find by email
                await mUserManager.FindByEmailAsync(loginCredentials.UsernameOrEmail)
                :
                // Find by username
                await mUserManager.FindByNameAsync(loginCredentials.UsernameOrEmail);

            // If we failed to find a user...
            if (user == null)
                // Return error message to user
                return errorResponse;

            // If we got here we have a user...
            // Let's validate the password

            // Get if password is valid
            var isValidPassword = await mUserManager.CheckPasswordAsync(user, loginCredentials.Password);

            // If the password was wrong
            if (!isValidPassword)
                // Return error message to user
                return errorResponse;

            // If we get here, we are valid and the user passed the correct login details

            // Get username
            var username = user.UserName;

            // get user table
            var userDb = mContext.Users.Where(a => a.Id == user.Id).FirstOrDefault();

            // Generate new refresh token for user
            if (userDb != null) 
                userDb.RefreshToken = user.GenerateJwtRefreshToken();

            mContext.SaveChanges();

            // Return token to user
            return new ApiResponse<UserProfileDetailsApiModel>
            {
                // Pass back the user details and the token
                Response = new UserProfileDetailsApiModel
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Username = user.UserName,
                    Token = user.GenerateJwtToken(),
                }
            };
        }

        [AllowAnonymous]
        [Route("refresh")]
        public async Task<ApiResponse<UserProfileDetailsApiModel>> RefreshToken(
          [FromBody] TokenModel tokenModel)
        {
            // TODO: Localize all strings
            // The message when we fail to login
            var invalidErrorMessage = "Nie możemy odnowić sesji!";
            var invalidErrorMessage2 = "Coś poszło nie tak";
            var invalidErrorMessage3 = "Prosimy o ponowne zalogowanie";

            // The error response for a failed login
            var errorResponse = new ApiResponse<UserProfileDetailsApiModel>
            {
                // Set error message
                ErrorMessage = invalidErrorMessage
            };
            var errorResponse2 = new ApiResponse<UserProfileDetailsApiModel>
            {
                // Set error message
                ErrorMessage = invalidErrorMessage2
            };
            var errorResponse3 = new ApiResponse<UserProfileDetailsApiModel>
            {
                // Set error message
                ErrorMessage = invalidErrorMessage3
            };

            // Make sure we have a user name
            if (tokenModel.Token == null)
                // Return error message to user
                return errorResponse;

            // Validate if the user credentials are correct...

            // Is it an email?
            var handler = new JwtSecurityTokenHandler();
            var handleraccessToken = handler.ReadToken(tokenModel.Token) as JwtSecurityToken;
            if (handleraccessToken == null)
                return errorResponse2;
            
            var username = handleraccessToken.Claims.First(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
            var tokenExpirationDate = handleraccessToken.ValidTo;
            var user = await mUserManager.FindByNameAsync(username);
            if (user == null)
                return errorResponse2;
            
            if (user.RefreshToken == null)
                return errorResponse3;
            
            var refreshToken = user.RefreshToken;
            var handlerRefreshToken = handler.ReadToken(refreshToken) as JwtSecurityToken;
            if (handlerRefreshToken == null)
                return errorResponse2;

            var refreshTokenExpirationDate = handlerRefreshToken.ValidTo;
          
            //var refreshToken = mContext.UserAccount.Where()
            if (tokenExpirationDate < DateTime.Now)
            {
                if (refreshTokenExpirationDate < DateTime.Now)
                {
                    return errorResponse3;
                }
                return new ApiResponse<UserProfileDetailsApiModel>
                {
                    // Pass back the user details and the token
                    Response = new UserProfileDetailsApiModel
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Username = user.UserName,
                        Token = user.GenerateJwtToken(),
                    }
                };
            }
         
            return errorResponse2;
        }
    }
}