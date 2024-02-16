using CMS.Api.UserSystem.Enum;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.UserSystem.Entities
{
    public class ProfilePicture
    {
        [Key]
        public Guid Id { get; set; }
        public ImageType ImageType { get; set; }
        public byte[]? ImageData { get; set; } = [];
    }
}
