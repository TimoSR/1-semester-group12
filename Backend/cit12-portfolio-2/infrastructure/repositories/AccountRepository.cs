using domain.account;
using domain.account.interfaces;

namespace infrastructure.repositories;

public sealed class AccountRepository : IAccountRepository
{
    public Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
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