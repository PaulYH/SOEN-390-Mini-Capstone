using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.PropertySystem.Entities;
public class ReservableRoom
{
    [Key]
    public Guid Id { get; set; }
    public int ExternalRoomId { get; set; } = -1;
    public string Name { get; set; } = String.Empty;
    public ICollection<ReservableRoom> Reservations { get; set; } = null!;
}
