using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models;

public class Note
{
    public int Id { get; set;}

    [DataType(DataType.Date)]
    public DateTime NoteDay { get; set;}
    public int MobId { get; set;}
    public virtual Mob Mob { get; set;}
    
}