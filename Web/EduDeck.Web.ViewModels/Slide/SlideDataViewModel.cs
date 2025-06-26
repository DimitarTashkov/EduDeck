using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduDeck.Web.ViewModels.Slide
{
    public class SlideDataViewModel
    {
        public string Id { get; set; } = null!;

        public string Title { get; set; } = null!;

        public int Order { get; set; }

        public string PresentationId { get; set; } = null!;
    }

}
