﻿using CMS.Api.UserSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace CMS.Api.RequestSystem.Entities
{
    public class TicketPost
    {
        [Key]
        public Guid Id { get; set; }
        public int ExternalPostId { get; set; }
        public bool Viewed { get; set; } = false;
        public string Description { get; set; } = String.Empty;
        public ApplicationUser CreatedBy { get; set; } = null!;
        public TicketPost? ReplyTo { get; set; } = null!;
    }
}
