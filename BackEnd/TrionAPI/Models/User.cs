using System.ComponentModel.DataAnnotations;

namespace TrionAPI.Models
{
    public class User
    {
        public string UserName { get; set; }
        public string SystemPassword { get; set; }
    }
}
