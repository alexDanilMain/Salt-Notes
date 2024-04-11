using System.ComponentModel.DataAnnotations;

public record MobPostReq()
{
    public required string Name { get; set;}
    
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set;}
    public List<string> MobMembers { get; set;} = new ();
};