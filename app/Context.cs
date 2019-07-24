using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using database.models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;

namespace database.data
{
    public class Context : DbContext
    {
        public static readonly LoggerFactory MyLoggerFactory = new LoggerFactory(new[] {
            new ConsoleLoggerProvider((_, __) => true, true)
        });

        // public DbSet<Post> Posts { get; set; }
        // public DbSet<Comment> Comments { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     if (!optionsBuilder.IsConfigured)
        //     {
        //         optionsBuilder.UseNpgsql(@"Host=localhost;Port=5432;Username=solutis;Password=solutis;Database=spotify-react-player;").UseLoggerFactory(MyLoggerFactory);
        //     }
        // }

        public override int SaveChanges()
        {
            var changedEntities = ChangeTracker.Entries().Where(_ => _.State == EntityState.Added ||  _.State == EntityState.Modified);

            var errors = new List<ValidationResult>(); 

            foreach (var e in changedEntities)
            {
                var vc = new ValidationContext(e.Entity, null, null);
                Validator.TryValidateObject(e.Entity, vc, errors, validateAllProperties: true);
            }

            if (errors.Count() > 0)
            {
                Console.WriteLine("Erros");
                errors.ForEach(Console.WriteLine);
                return 0;
                //throw new ValidationException();
            }
            
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Console.WriteLine("Modelo Criado");
        }
    }

}
