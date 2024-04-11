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

        var note = new Note
        {
            NoteDay = noteDay,
            NoteContent = postReq.NoteContent, 
            MobId = mob.MobId,
            Mob = mob
        };

        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        var Note = await _context.Notes.FindAsync(id);

        if (Note == null)
        {
            return NotFound();
        }

        return Note;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Note>>> GetNotes()
    {
        return await _context.Notes.ToListAsync();
    }

}
