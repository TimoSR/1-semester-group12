using domain.account;
using domain.account.interfaces;
using Microsoft.EntityFrameworkCore;

namespace infrastructure.repositories;

public sealed class AccountRepository : IAccountRepository
{
    private readonly MovieContext _context;

    public AccountRepository(MovieContext context)
    {
        _context = context;
    }
    
    public async Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var account = await _context.Accounts.FirstAsync(a => a.Email == email);

        // This call is allowed because of InternalsVisibleTo, in assemblyinfo
        return new Account(
            account.Id,
            account.Email,
            account.UserName,
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
}