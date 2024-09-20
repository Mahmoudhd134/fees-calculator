using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace test.Models;

public class Ticket
{
    public int Id { get; set; }

    [MinLength(5), MaxLength(20), Required]
    public string Name { get; set; }

    [Required] public DateTime Date { get; set; }
    [ForeignKey("DomainId")] public Domain? Domain { get; set; }
    public int DomainId { get; set; }
}