using System.ComponentModel.DataAnnotations;

namespace CinemaApi.Models
{
    public class MoviesDataModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Title { get; set; }

        [Required]
        [MaxLength(2048)]
        public string Description { get; set; }
    }
}
