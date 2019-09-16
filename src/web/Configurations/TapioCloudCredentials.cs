using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Aitgmbh.Tapio.Developerapp.Web.Configurations
{
    public class TapioCloudCredentials
    {
        [Required(AllowEmptyStrings = false)]
        public string ClientSecret { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string ClientId { get; set; }
    }
}
