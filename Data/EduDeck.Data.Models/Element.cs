using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduDeck.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Element
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(30)]
        public string Type { get; set; }

        [Required]
        public float X { get; set; } = 0;

        [Required]
        public float Y { get; set; } = 0;

        [Required]
        public float Width { get; set; } = 100;

        [Required]
        public float Height { get; set; } = 100;

        public int? FontSize { get; set; }

        [StringLength(50)]
        public string? FontFamily { get; set; }

        [StringLength(10)]
        public string? FontColor { get; set; }

        [StringLength(10)]
        public string? BackgroundColor { get; set; }

        [StringLength(10)]
        public string? BorderColor { get; set; }

        public float? Rotation { get; set; }

        public float? Opacity { get; set; }

        public int ZIndex { get; set; } = 0;

        [Required]
        public bool IsDeleted { get; set; } = false;

        [Required]
        public Guid SlideId { get; set; }

        [ForeignKey(nameof(SlideId))]
        public Slide Slide { get; set; } = default!;
    }
}
