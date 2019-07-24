using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace database.models
{
    public class FavoriteArtist
    {
        [Key]
        public int id {get;set;}
        [Required]
        [Column(TypeName="nvarchar(200)")]
        public int name {get;set;}

    }
}