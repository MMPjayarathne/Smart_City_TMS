using Microsoft.EntityFrameworkCore;
using RoadTrackingService.Models;

namespace RoadTrackingService.Data
{
    public class RoadDbContext : DbContext
    {
        public RoadDbContext(DbContextOptions<RoadDbContext> options) : base(options) {}

        // public DbSet<VehicleLocation> VehicleLocations { get; set; }
        public DbSet<BusLineStatus> BusLineStatus { get; set; }
        public DbSet<LineStatus> LineStatuses { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
        public DbSet<Disruption> Disruptions { get; set; }
        public DbSet<ValidityPeriod> ValidityPeriods { get; set; }

        public DbSet<RoadDisruption> RoadDisruptions { get; set; }
        public DbSet<Geography> Geography { get; set; }
        public DbSet<Crs> Crs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Disruption>(entity =>
            {
                entity.HasKey(e => e.id);
                entity.Property(e => e.id).ValueGeneratedNever();

                // Use value converter to store List<string> as a comma-separated string
                entity.Property(e => e.affectedRoutes)
                    .HasConversion(
                        v => string.Join(",", v),  // Convert List<string> to comma-separated string
                        v => v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList());  // Convert comma-separated string back to List<string>

                entity.Property(e => e.affectedStops)
                    .HasConversion(
                        v => string.Join(",", v),  // Convert List<string> to comma-separated string
                        v => v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList());  // Convert comma-separated string back to List<string>
            });

            modelBuilder.Entity<RoadDisruption>(entity =>
            {
                entity.HasKey(e => e.generatedId);
                entity.Property(e => e.generatedId).ValueGeneratedNever();

                
                entity.Property(e => e.corridorIds)
                    .HasConversion(
                        v => string.Join(",", v),  
                        v => v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList()); 

            });

             modelBuilder.Entity<Crs>()
                .Property(c => c.properties)
                .HasConversion(
                    v => v.ContainsKey("name") ? v["name"] : null,  // Convert Dictionary to string (store only "name")
                    v => new Dictionary<string, string> { { "name", v } }  // Convert back to Dictionary when loading
                );
        }
    }
}
