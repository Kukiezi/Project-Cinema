using CinemaApi.Models;
using Dna;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CinemaApi
{
    /// <summary>
    /// A shorthand access class to get DI services with nice clean short code
    /// </summary>
    public static class DI
    {
        /// <summary>
        /// The scoped instance of the <see cref="ApplicationDbContext"/>
        /// </summary>
        public static CinemaDBContext CinemaDBContext => Framework.Provider.GetService<CinemaDBContext>();

        /// <summary>
        /// The transient instance of the <see cref="IEmailSender"/>
        /// </summary>
        //public static IEmailSender EmailSender => Framework.Provider.GetService<IEmailSender>();

        ///// <summary>
        ///// The transient instance of the <see cref="IEmailTemplateSender"/>
        ///// </summary>
        //public static IEmailTemplateSender EmailTemplateSender => Framework.Provider.GetService<IEmailTemplateSender>();
    }
}
