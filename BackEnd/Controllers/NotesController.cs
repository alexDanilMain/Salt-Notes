using BackEnd.Data;
using BackEnd.Models;
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
    public async Task<ActionResult<Note>> PostNote([FromBody] Note Note)
    {
        _context.Notes.Add(Note);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNote), new { id = Note.Id }, Note);
    }

    [HttpGet("{id}")]
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
    public async Task<ActionResult<List<Note>>> GetNotes()
    {
        return await _context.Notes.ToListAsync();
    }

}
