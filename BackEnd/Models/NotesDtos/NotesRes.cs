namespace BackEnd.Models;
public record NotesRes{
    public NoteDetails? YourNote { get; init; }
    public List<NoteDetails> OtherMobNotes { get; init; } = new List<NoteDetails>();
}

public record NoteDetails
{
    public string MobName { get; init; } = string.Empty;
    public string NoteContent { get; init; } = string.Empty;
}