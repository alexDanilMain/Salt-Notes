using Microsoft.EntityFrameworkCore;
using BackEnd.Models;

namespace BackEnd.Data;
public class AppDbContext : DbContext
{
    public DbSet<Mob> Mobs { get; set; }
    public DbSet<Note> Notes { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
    {
    }
}