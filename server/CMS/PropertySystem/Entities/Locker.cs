﻿using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.PropertySystem.Entities
{
    public class Locker
    {
        [Key]
        public Guid Id { get; set; }
        public int ExternalLockerId { get; set; } = -1;
        [Column(TypeName = "decimal(6, 2)")]
        public decimal LockerFee { get; set; } = -1;
        public PublicUser Owner { get; set; } = null!; // TODO: add role verification
    }
}