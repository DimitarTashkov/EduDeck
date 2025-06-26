using EduDeck.Data.Common.Models;
using EduDeck.Data.Models.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduDeck.Data.Models
{
    public class PresentationParticipant : BaseDeletableModel<Guid>
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid PresentationId { get; set; }

        [ForeignKey(nameof(PresentationId))]
        public Presentation Presentation { get; set; } = default!;

        [Required]
        public string ApplicationUserId { get; set; }

        [ForeignKey(nameof(ApplicationUserId))]
        public ApplicationUser ApplicationUser { get; set; } = default!;

        [Required]
        [StringLength(20)]
        public PresentationModifier AccessLevel { get; set; }
    }
}
