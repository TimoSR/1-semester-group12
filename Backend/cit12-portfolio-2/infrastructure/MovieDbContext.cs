using domain.account;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class MovieDbContext (DbContextOptions<MovieDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts => Set<Account>();

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