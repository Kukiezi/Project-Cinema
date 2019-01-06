using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CinemaApi.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;

namespace CinemaApi.Controllers
{
    [Route("cinema/")]
    [ApiController]
    public class UserController : ControllerBase
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
        public UserController(
            CinemaDBContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            mContext = context;
            mUserManager = userManager;
            mSignInManager = signInManager;
        }


     
        [Route("Register")]
        [HttpGet]
        public async Task<IActionResult> CreateUserAsync()
        {
            var result = await mUserManager.CreateAsync(new ApplicationUser
            {
               UserName = "Kuki",
               Email = "dawidweltrowski@gmail.com",
            }, "password");

            if (result.Succeeded)
                return Content("User was created", "text/html");

            return Content("User creation failed", "text/html");
        }


        [Route("Login")]
        [HttpGet]
        public async Task<ActionResult> LoginAsync()
        {
            var result = await LoginPerform();
                return Ok("xd");
            
               

            return Content("Error!");
        }

     
   
        public async Task<IActionResult> LoginPerform()
        {
            var result = await mSignInManager.PasswordSignInAsync("Kuki", "password", true, false);


            if (result.Succeeded)
            {
                return Ok();
            }


            return Content("Error!");
        }

        [Route("Name")]
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserName()
        {
            string userName = User.Identity.Name;
            var user = await mUserManager.GetUserAsync(HttpContext.User);
            Trace.WriteLine(User.Identity.Name);
            return Content(User.Identity.Name);
        }
        #endregion
    }
}