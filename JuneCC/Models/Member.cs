using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JuneCC.Models
{
    public class Member
    {
        [Key]
        public int MemberId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime MembershipExpiry { get; set; }
        public DateTime DOJ { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? user { get; set; }



        public Member()
        {
            
        }

        public Member(int memberId, string name, string phone, DateTime membershipExpiry, DateTime dOJ, int userId, User user)
        {
            MemberId = memberId;
            Name = name;
            Phone = phone;
            MembershipExpiry = membershipExpiry;
            DOJ = dOJ;
            UserId = userId;
            this.user = user;
        }
    }

   
}
