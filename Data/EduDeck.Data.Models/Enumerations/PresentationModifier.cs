using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduDeck.Data.Models.Enumerations
{
    public enum PresentationModifier
    {
        None = 0,
        Read = 1, // Can view the presentation
        Edit = 2, // Can modify the presentation
        Delete = 3, // Can delete the presentation
        Share = 4, // Can share the presentation with others
        Comment = 5 // Can add comments to the presentation
    }
}
