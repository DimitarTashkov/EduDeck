using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduDeck.Web.ViewModels.Slide
{
    public class EditSlideInputModel
    {
        [Required]
        public string Id { get; set; } = null!;

        [Required]
        public string Title { get; set; } = null!;

        [Range(1, int.MaxValue)]
        public int Order { get; set; }

        [Required]
        public string PresentationId { get; set; } = null!;
    }

}
