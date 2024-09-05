namespace TrionAPI.Models
{
    public class UserMenu
    {
        public int? Autoid { get; set; }
        public int? EmpId { get; set; }
        public int? ParentMenuAutoid { get; set; }
        public int? MenuAutoid { get; set; }
        public string? MenuName { get; set; }
        public string? MenuIcon { get; set; }
        public string? MenuLink { get; set; }
        public string? OpCode { get; set; }
        public string?  PMenuName { get; set; }
        public string? PMenuLink { get; set; }
        public string? PMenuIcon { get; set; }
    }
}
