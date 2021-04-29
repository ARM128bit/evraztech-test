using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace evraztech_test.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<EquipmentType> EquipmentType { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            /*Database.EnsureDeleted();*/
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
        /*protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<EquipmentType>()
            .HasOne<Equipment>(e => e.Eq)
            .WithOne(et => et.Type)
            .HasForeignKey<Equipment>(p => p.TypeID);
        }*/

    }
}