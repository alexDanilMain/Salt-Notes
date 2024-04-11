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

        var existingNote = await _context.Notes.FirstOrDefaultAsync(note => note.MobId == mob.MobId && note.NoteDay == noteDay);
        
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
    public async Task<ActionResult<NotesRes>> GetNote(int day)
    {
    var userEmail = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;

    if (string.IsNullOrEmpty(userEmail))
    {
        return BadRequest("User email not found in token.");
    }

    var userMob = await _context.Mobs.Include(mob => mob.Notes).FirstOrDefaultAsync(mob => mob.MobMembers.Contains(userEmail));
    if (userMob == null)
    {
        return NotFound("Mob not found.");
    }

    var daysSinceStart = CalculateWeekdays(userMob.StartDate.Date, DateTime.Now.Date);

    if (day >= daysSinceStart && daysSinceStart < 65)
    {
        if(day == daysSinceStart && DateTime.Now.TimeOfDay < new TimeSpan(16, 0, 0)){
            return Unauthorized($"Accessable today 16:00");
        }else if(day > daysSinceStart && daysSinceStart < 65){
            return Unauthorized($"Accessable in {day - daysSinceStart} days");
        }

    }

    var yourNote = userMob.Notes.Where(note => note.NoteDay == day)
                                .Select(note => new NoteDetails { MobName = userMob.Name, NoteContent = note.NoteContent })
                                .FirstOrDefault();


    var otherMobNotes = await _context.Notes.Include(note => note.Mob)
                                             .Where(note => note.NoteDay == day && note.MobId != userMob.MobId)
                                             .Select(note => new NoteDetails { MobName = note.Mob.Name, NoteContent = note.NoteContent })
                                             .ToListAsync();

    var response = new NotesRes
    {
        YourNote = yourNote,
        OtherMobNotes = otherMobNotes
    };

    return response;
    }

    public static int CalculateWeekdays(DateTime start, DateTime end)
    {
        int totalDays = 0;
        for (DateTime date = start; date <= end; date = date.AddDays(1))
        {
            if (date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
            {
                totalDays++;
            }
        }
        return totalDays;
    }

}
