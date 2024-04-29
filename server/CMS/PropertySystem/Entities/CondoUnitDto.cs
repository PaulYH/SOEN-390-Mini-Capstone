namespace CMS.Api.PropertySystem.Entities
{
    public class CondoUnitDto
    {
        public Guid Id { get; set; }
        public int ExternalUnitId { get; set; }
        public int Size { get; set; }
        public decimal FeePerSquareFoot { get; set; }
        public string OwnerEmail { get; set; }
        public string OccupantEmail { get; set; }

    }
}
