using service_patterns;

namespace domain.account.interfaces;

// Defines a contract for account persistence operations. 
// This abstraction allows the domain layer to depend only on the interface, 
// while the actual implementation (e.g., database, API, cache) is provided by the infrastructure layer.

public interface IAccountRepository : IRepository<Account>
{
    Task<Account?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<Account?> GetByUserNameAsync(string userName, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}