using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CinemaApi.Models.Error
{
    public static class IdentityErrorExtensions
    {
        /// <summary>
        /// Combines all errors into a single string
        /// </summary>
        /// <param name="errors">The errors to aggregate</param>
        /// <returns>Returns a string with each error separated by a new line</returns>
        public static string AggregateErrors(this IEnumerable<IdentityError> errors)
        {
            // Get all errors into a list
            return errors?.ToList()
                // Grab their description
                .Select(f => f.Description)
                // And combine them with a newline separator
                .Aggregate((a, b) => $"{a}{Environment.NewLine}{b}");
        }
    }
}
