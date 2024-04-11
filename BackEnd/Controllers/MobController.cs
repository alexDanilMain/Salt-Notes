
using BackEnd.Data;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class MobController : ControllerBase
{
    private readonly AppDbContext _context;

    public MobController(AppDbContext context)
    {
        _context = context;
    }


    [HttpPost]
    public async Task<ActionResult<Mob>> PostMob([FromBody] MobPostReq mobReq)
    {
        var mob = new Mob
        {
            Name = mobReq.Name,
            StartDate = mobReq.StartDate,
            MobMembers = mobReq.MobMembers,
            
        };
        _context.Mobs.Add(mob);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMob), new { id = mob.MobId }, mob);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Mob>> GetMob(int id)
    {
        var mob = await _context.Mobs.FindAsync(id);

        if (mob == null)
        {
            return NotFound();
        }

        return mob;
    }

    [HttpGet]
    public async Task<ActionResult<List<Mob>>> GetMobs()
    {
        return await _context.Mobs.ToListAsync();
    }

}
