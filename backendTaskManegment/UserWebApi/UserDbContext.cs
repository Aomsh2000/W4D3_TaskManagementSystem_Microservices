using Microsoft.EntityFrameworkCore;

namespace UserWebApi
{
    public class UserDbContext : DbContext
    {
        public DbSet<Models.User> Users { get; set; }

        // Constructor
        public UserDbContext(DbContextOptions<UserDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        // OnModelCreating should be defined at the class level
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the primary key explicitly, though the attribute should work fine
            modelBuilder.Entity<Models.User>().HasKey(u => u.Id);

           
        }
    }
}
