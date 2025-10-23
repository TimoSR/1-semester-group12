using domain.account;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class MovieContext (DbContextOptions<MovieContext> options) : DbContext(options)
{
    public DbSet<Account> Products => Set<Account>();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Only configure if not configured externally (for example, in Program.cs)
        if (optionsBuilder.IsConfigured) return;
        const string connectionString =
            "Host=localhost;Port=5432;Database=northwind;Username=postgres;Password=1234";
        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Not fully implemented
        
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id);
        });
        
        throw new NotImplementedException();
    }
}