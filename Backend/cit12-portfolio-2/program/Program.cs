using api.controllers;
using application.accountService;
using Microsoft.EntityFrameworkCore;
using domain.account.interfaces;
using infrastructure;
using infrastructure.repositories;
using program;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load(".env.local");
builder.Configuration.AddEnvironmentVariables();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("APP"));
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DATABASE"));

// 1. Get the connection string
var connectionString = builder.Configuration["DATABASE__CONNECTION_STRING"];

// 2. Register DbContext
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseNpgsql(connectionString));

// 3. Register your repositories and Unit of Work as Scoped
// This means you get one instance per HTTP request.
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAccountService, AccountService>();

// 4. Register you applications services

// 5. Register your controllers

builder.Services
    .AddControllers()
    .AddApplicationPart(typeof(AccountsController).Assembly)
    .AddControllersAsServices();

// Application addons
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseRouting();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

// Final configuration



app.UseHttpsRedirection();
app.MapControllers();
app.UseSwagger();
app.UseCors();
app.Run();