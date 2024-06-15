using JuneCC.Models;
using Microsoft.EntityFrameworkCore;

namespace JuneCC.Contexts
{
    public class JuneContext : DbContext
    {
        public JuneContext(DbContextOptions options) : base(options)
        {

        }
            public DbSet<Member>? Members { get; set; }
            public DbSet<User>? Users { get; set; }
    
    }
}
