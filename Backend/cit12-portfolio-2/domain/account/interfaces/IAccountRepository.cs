using service_patterns;

namespace domain.account.interfaces;

public interface IAccountRepository : IRepository<Account>
{
    Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<Account?> GetByUserNameAsync(string userName, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}