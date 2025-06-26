using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace EduDeck.Data.Models
{
    using EduDeck.Data.Common.Models;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Slide : BaseDeletableModel<Guid>
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public Guid PresentationId { get; set; }

        [ForeignKey(nameof(PresentationId))]
        public Presentation Presentation { get; set; } = default!;

        public ICollection<Element> Elements { get; set; } = new List<Element>();

        [Required]
        public bool IsDeleted { get; set; } = false;
    }

}
