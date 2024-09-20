using System.ComponentModel.DataAnnotations;

namespace test.Models;

public class Domain
{
    public int Id { get; set; }
    [Required, MaxLength(20)] public string Name { get; set; }
    public List<Ticket> Tickets { get; set; }
}