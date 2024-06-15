using JuneCC.Interfaces;
using JuneCC.Models;
using JuneCC.Models.DTOs;
using JuneCC.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JuneCC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]

    public class MemberController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMemberService _memberService;
        private readonly ILogger<MemberController> _logger; // Add logger

        public MemberController(IMemberService memberService,IUserService userService ,ILogger<MemberController> logger)
        {
            _memberService = memberService;
            _userService = userService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Member>>> GetAllMembersAsync()
        {
            try
            {
                var members = await _memberService.GetAllMembersAsync();
                return Ok(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching all members");
                return StatusCode(500, "Internal server error occurred");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMemberByIdAsync(int id)
        {
            try
            {
                var member = await _memberService.GetMemberByIdAsync(id);
                if (member == null)
                {
                    return NotFound();
                }
                return Ok(member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching member with ID {id}");
                return StatusCode(500, $"Internal server error occurred");
            }
        }

        [HttpPost]
        [Route("AddMember")]
        public async Task<ActionResult<Member>> AddMember(AddMemberDTO memberDTO)
        {
            try
            {
                User user = new User();
                user.UserName = memberDTO.UserName;
                user.Email = memberDTO.Email;
                user.Password = memberDTO.Password;
                user.IsAdmin = memberDTO.IsAdmin;

                var users = await _userService.AddUser(user);

                Member member = new Member();
                member.Name = memberDTO.Name;
                member.Email = memberDTO.Email;
                member.Phone = memberDTO.Phone;
                member.MembershipExpiry = memberDTO.MembershipExpiry;
                member.DOJ = memberDTO.DOJ;
                member.UserId = users.UserId;

                return await _memberService.AddMember(member);

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return NotFound(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Member>> UpdateMemberAsync(int id, Member updatedMember)
        {
            try
            {
                var member = await _memberService.UpdateMemberAsync(id, updatedMember);
                return Ok(member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating member with ID {id}");
                return StatusCode(500, $"Internal server error occurred");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMemberAsync(int id)
        {
            try
            {
                await _memberService.DeleteMemberAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting member with ID {id}");
                return StatusCode(500, $"Internal server error occurred");
            }
        }
    }
}
