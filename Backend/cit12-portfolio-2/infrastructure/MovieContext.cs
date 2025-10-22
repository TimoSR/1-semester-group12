using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class MovieContext (DbContextOptions<MovieContext> options) : DbContext(options)
{
}