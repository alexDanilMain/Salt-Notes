using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackEnd.Models;

public class Note
{
    public int Id { get; set;}
    public int NoteDay { get; set;}
    public required string NoteContent { get; set;}
    public int MobId { get; set;}
    
    [JsonIgnore]
    public virtual Mob Mob { get; set;}

    [NotMapped] 
    public string? MobName => Mob?.Name;
}