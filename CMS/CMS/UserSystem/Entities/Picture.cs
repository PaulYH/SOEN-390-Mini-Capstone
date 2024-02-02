using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.UserSystem.Enums;

namespace CMS.UserSystem.Entities;
public class Picture
{
    public ImageType ImageType { get; set; }
    public byte[]? ImageData { get; set; }
}
