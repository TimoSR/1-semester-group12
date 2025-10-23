using domain.account;
using domain.account.interfaces;
using Microsoft.EntityFrameworkCore;

namespace infrastructure.repositories;

public sealed class AccountRepository : IAccountRepository
{
    private readonly MovieDbContext _dbContext;

    public AccountRepository(MovieDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var account = await _dbContext.Accounts.FirstAsync(a => a.Email == email, cancellationToken: cancellationToken);

        // This call is allowed because of InternalsVisibleTo, in assemblyinfo
        return new Account(
            account.Id,
            account.Email,
            account.Username,
            account.Password,
            account.CreatedAt);
    }

    public Task<Account?> GetByUserNameAsync(string userName, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task AddAsync(Account account, CancellationToken cancellationToken = default)
    {
        await _dbContext.Accounts.AddAsync(account, cancellationToken);
    }
    
    public async Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Accounts
            .AsNoTracking() // Optional: skip EF change tracking for read-only query
            .FirstOrDefaultAsync(a => a.Id == id, cancellationToken);
    }
}