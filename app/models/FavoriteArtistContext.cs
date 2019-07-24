using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace database.models
{
    public class FavoriteArtistContext : DbContext
    {
        public FavoriteArtistContext(DbContextOptions<FavoriteArtistContext> options): base(options)
        {

        }
        public DbSet<FavoriteArtist> FavoriteArtists{get;set;}
    }
}