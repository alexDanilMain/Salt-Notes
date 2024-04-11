using System.Security.Claims;
using BackEnd.Data;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }


    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Note>> PostNote([FromBody] NotesPostReq postReq)
    {
        var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        
        if (string.IsNullOrEmpty(userEmail))
        {
            return BadRequest("User email not found in token.");
        }

        var mob = await _context.Mobs.FirstOrDefaultAsync(m => m.MobMembers.Contains(userEmail));

        if (mob == null)
        {
            return NotFound("Mob not found.");
        }

        var noteDay = (DateTime.Now.Date - mob.StartDate.Date).Days + 1;

        var existingNote = await _context.Notes.FirstOrDefaultAsync(n => n.MobId == mob.MobId && n.NoteDay == noteDay);
        
        var note = new Note
            {
                NoteDay = noteDay,
                NoteContent = postReq.NoteContent,
                MobId = mob.MobId,
                Mob = mob
            };

        if (existingNote != null)
        {
            existingNote.NoteContent = postReq.NoteContent;
        }
        else
        {
   
            _context.Notes.Add(note);
        }
   
        await _context.SaveChangesAsync();
        if (existingNote != null)
        {
            return Ok(existingNote);
        }
        else
        {
            return CreatedAtAction(nameof(GetNote), new { day = note.NoteDay }, note);
        }

    }

    [HttpGet("{day}")]
    [Authorize]
    public async Task<ActionResult<List<Note>>> GetNote(int day)
    {

    var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

    if (string.IsNullOrEmpty(userEmail))
    {
        return BadRequest("User email not found in token.");
    }

    var mob = await _context.Mobs.FirstOrDefaultAsync(m => m.MobMembers.Contains(userEmail));

    if (mob == null)
    {
        return NotFound("Mob not found.");
    }
    var daysSinceStart = (DateTime.Now.Date - mob.StartDate.Date).Days + 1;

    if (day == daysSinceStart && DateTime.Now.TimeOfDay < new TimeSpan(12, 0, 0))
    {
        return Unauthorized("Cannot access today's notes before 16:00.");
    }

    var notes = await _context.Notes
                              .Where(n => n.NoteDay == day)
                              .ToListAsync();

    if (!notes.Any())
    {
        return new List<Note>();
    }

    return notes;
    }

}
