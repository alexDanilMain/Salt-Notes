using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models;

public class Mob
{
    public int MobId { get; set;}
    public required string Name { get; set;}

    [DataType(DataType.Date)]
    public DateTime StartDate { get; set;}
    public List<string> MobMembers { get; set;} = new ();
    public virtual List<Note> Notes { get; set; } = new List<Note>();

}