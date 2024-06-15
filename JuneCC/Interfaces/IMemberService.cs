using JuneCC.Models;

namespace JuneCC.Interfaces
{
    public interface IMemberService
    {
        Task<List<Member>> GetAllMembersAsync();
        Task<Member> GetMemberByIdAsync(int id);
        Task<Member> AddMember(Member member);
        Task<Member> UpdateMemberAsync(int id, Member updatedMember);
        Task<Member> DeleteMemberAsync(int id);
    }
}
