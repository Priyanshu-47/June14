using JuneCC.Exceptions;
using JuneCC.Interfaces;
using JuneCC.Models;

namespace JuneCC.Services
{
        public class UserService : IUserService
        {
            private readonly IRepository<int, Member> _members;
            private readonly IRepository<int, User> _user;
        public UserService(IRepository<int, Member> member, IRepository<int, User> user)
        {
            _members = member;
            _user = user;
        }
        public async Task<User> AddUser(User user)
            {
                return await _user.Add(user);
            }

            public async Task<List<User>> GetAllUser()
            {
                return await _user.GetAsync();
            }

            public async Task<User> GetUser(int userId)
            {
                var user = await _user.GetAsync(userId);
                if (user != null)
                {
                    return user;
                }
                throw new NoSuchUserException();
            }

            public async Task<bool> RemoveUser(User user)
            {
                var users = await _user.GetAsync(user.UserId);
                if (users != null)
                {
                    _user.Delete(user.UserId);
                    return true;
                }
                throw new NoSuchUserException();
            }

            public async Task<User> UpdateUser(User user)
            {
                var users = await _user.GetAsync(user.UserId);
                if (users != null)
                {
                    users.Email = user.Email;
                    users.Password = user.Password;
                    return await _user.Update(users);
                }
                throw new NoSuchUserException();
            }
        }
    }


