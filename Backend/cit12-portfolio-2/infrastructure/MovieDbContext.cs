using domain.account;
using Microsoft.EntityFrameworkCore;
using service_patterns;

namespace infrastructure;

public class MovieDbContext (DbContextOptions<MovieDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts => Set<Account>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Ignore<DomainEvent>();
        
        modelBuilder.Entity<Account>(entity =>
        {
            // Primary Key
            entity.HasKey(e => e.Id);

            // Table name (optional, defaults to DbSet name)
            entity.ToTable("Accounts");

            // Email
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);

            // Username
            entity.Property(e => e.Username)
                .IsRequired()
                .HasMaxLength(100);

            // Password
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(100); // or more if hashed

            // CreatedAt
            entity.Property(e => e.CreatedAt)
                .IsRequired()
                .HasDefaultValueSql("NOW()"); // PostgreSQL-specific

            // Optional: Indexes for performance
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Username).IsUnique();
        });
    }
}