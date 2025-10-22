﻿using service_patterns;

namespace domain.account;

public record PasswordChangedEvent(Guid AccountId, DateTime ChangedAt) : DomainEvent;
public record EmailChangedEvent(Guid AccountId, string NewEmail, DateTime ChangedAt) : DomainEvent;
public record AccountCreatedEvent(Guid AccountId, string Email, DateTime CreatedAt) : DomainEvent;