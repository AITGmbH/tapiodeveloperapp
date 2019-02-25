using System.ComponentModel.DataAnnotations;

namespace Aitgmbh.Tapio.Developerapp.Web.Configurations
{
    public class TapioCloud
    {
        [Required(AllowEmptyStrings = false)]
        public string ClientSecret { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string ClientId { get; set; }
    }
}
