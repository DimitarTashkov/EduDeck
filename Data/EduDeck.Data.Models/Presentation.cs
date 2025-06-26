using EduDeck.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduDeck.Data.Models
{
    public class Presentation : BaseDeletableModel<Guid>
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public DateTime DateOfCreation { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime LastModification { get; set; } = DateTime.UtcNow;

        [Required]
        public string CreatorId { get; set; }

        [ForeignKey("CreatorId")]
        public ApplicationUser Creator { get; set; } = default!;

        public ICollection<Slide> Slides { get; set; } = new List<Slide>();
        public ICollection<PresentationParticipant> Participants { get; set; } = new List<PresentationParticipant>();
    }
}
