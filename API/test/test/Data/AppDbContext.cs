using Microsoft.EntityFrameworkCore;
using test.Models;

namespace test.Data;

public class AppDbContext : DbContext
{
    public DbSet<Domain> Domains { get; set; }
    public DbSet<Ticket> Tickets { get; set; }

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Domain>()
            .HasData([
                new Domain()
                {
                    Id = 1,
                    Name = "Science"
                },
                new Domain()
                {
                    Id = 2,
                    Name = "Cooking"
                },
                new Domain()
                {
                    Id = 3,
                    Name = "Games"
                }
            ]);
    }
}