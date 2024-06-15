namespace JuneCC.Models.DTOs
{
    public class AddMemberDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime MembershipExpiry { get; set; }
        public DateTime DOJ { get; set; }
    }
}
