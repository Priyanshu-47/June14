using JuneCC.Models;
using JuneCC.Interfaces;
using Microsoft.EntityFrameworkCore.Migrations;
using JuneCC.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using JuneCC.Exceptions;

namespace JuneCC.Repositories
{
    public class MemberRepository : IRepository<int, Member>
    {
        JuneContext _context;
        ILogger<MemberRepository> _logger;

        public MemberRepository(JuneContext context , ILogger<MemberRepository> logger)
        {
            _context = context;
            _logger = logger;
            
        }
        public async Task<Member> Add(Member item)
        {
            _context.Add(item);
            _context.SaveChanges();
            _logger.LogInformation("Member added " + item.MemberId);
            return item;
        }

        public async Task<Member> Delete(int key)
        {
            var member = await GetAsync(key);
            _context?.Members.Remove(member);
            _context?.SaveChanges();
            _logger.LogInformation("Member deleted " + key);
            return member;
        }

        public async Task<Member> GetAsync(int key)
        {
            var members = await GetAsync();
            var member = members.FirstOrDefault(e => e.MemberId == key);
            if (member != null)
            {
                return member;
            }
            throw new NoSuchMemberException();
            
        }

        public async Task<List<Member>> GetAsync()
        {
            var members = _context.Members.ToList();
            return members;
        }

        public async Task<Member> Update(Member item)
        {
            var member = await GetAsync(item.MemberId);
            _context.Entry<Member>(item).State = EntityState.Modified;
            _context.SaveChanges();
            _logger.LogInformation("Member updated " + item.MemberId);
            return member;
        }
    }
}
