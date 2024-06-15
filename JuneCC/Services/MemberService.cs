using JuneCC.Interfaces;
using JuneCC.Models;
using JuneCC.Models.DTOs;
using JuneCC.Repositories;

namespace JuneCC.Services
{
    public class MemberService :IMemberService
    {
        private readonly IRepository<int, Member> _memberRepository;

        public MemberService(IRepository<int, Member> memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public async Task<List<Member>> GetAllMembersAsync()
        {
            return await _memberRepository.GetAsync();
        }

        public async Task<Member> GetMemberByIdAsync(int id)
        {
            return await _memberRepository.GetAsync(id);
        }   

        public async Task<Member> AddMember(Member member)
        {
            // You may want to add some validation here before adding the member
            return await _memberRepository.Add(member);
        }

        public async Task<Member> UpdateMemberAsync(int id, Member updatedMember)
        {
            var existingMember = await _memberRepository.GetAsync(id);
            if (existingMember == null)
            {
                // Handle not found scenario
                throw new Exception("Member not found");
            }

            // Update properties of existingMember with values from updatedMember
            existingMember.Name = updatedMember.Name;
            existingMember.Email= updatedMember.Email;
            existingMember.Phone = updatedMember.Phone;
            existingMember.MembershipExpiry = updatedMember.MembershipExpiry;
            existingMember.DOJ = updatedMember.DOJ;
            // Update other properties as needed

            return await _memberRepository.Update(existingMember);
        }

        public async Task<Member> DeleteMemberAsync(int id)
        {
            var existingMember = await _memberRepository.GetAsync(id);
            if (existingMember == null)
            {
                // Handle not found scenario
                throw new Exception("Member not found");
            }

            return await _memberRepository.Delete(id);
        }
    }
}
