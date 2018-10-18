using System.ComponentModel.DataAnnotations;

namespace CinemaApi.Models
{
    /// <summary>
    /// Model tabeli z bazy danych
    /// </summary>
    public class MoviesDataModel
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string Picture { get; set; }

        [Required]
        public int AgeRestriction { get; set; }

        [Required]
        [MaxLength(64)]
        public string Title { get; set; }

        [Required]
        [MaxLength(2048)]
        public string Description { get; set; }
    }
}
