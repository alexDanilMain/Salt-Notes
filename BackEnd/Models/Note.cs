using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models;

public class Note
{
    public int Id { get; set;}
    public int NoteDay { get; set;}
    public required string NoteContent { get; set;}
    public int MobId { get; set;}
    public required virtual Mob Mob { get; set;}

}