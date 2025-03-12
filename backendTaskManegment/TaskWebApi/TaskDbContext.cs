using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace TaskWebApi
{
    public class TaskDbContext : DbContext
    {
        public DbSet<Models.Task> Tasks { get; set; }
        public TaskDbContext(DbContextOptions<TaskDbContext> dbContextOptions) : base(dbContextOptions)
        {
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect())
                    {
                        databaseCreator.Create();
                    }
                    if (!databaseCreator.HasTables())
                    {
                        databaseCreator.CreateTables();
                    }
                }



            }

            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the primary key explicitly, though the attribute should work fine
            modelBuilder.Entity<Models.Task>().HasKey(t => t.id);

            // You can also seed some data if needed
            modelBuilder.Entity<Models.Task>().HasData(
                new Models.Task("1", false, "Task 1", false),
                new Models.Task("2", false, "Task 2", false),
                new Models.Task("3", false, "Task 3",false)
            );
        }

    }
}
