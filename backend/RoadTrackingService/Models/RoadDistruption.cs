using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoadTrackingService.Models{
    public class RoadDisruption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long generatedId {get; set;}[Key]
        public string id { get; set; }
        
        public string url { get; set; }
        public string point { get; set; }
        public string severity { get; set; }
        public int ordinal { get; set; }
        public string category { get; set; }
        public string subCategory { get; set; }
        public string comments { get; set; }
        public string currentUpdate { get; set; }
        public DateTime currentUpdateDateTime { get; set; }
        
        public List<string> corridorIds { get; set; }

        public DateTime startDateTime { get; set; }
        public DateTime endDateTime { get; set; }
        public DateTime lastModifiedTime { get; set; }
        
        public string levelOfInterest { get; set; }
        public string location { get; set; }
        public string status { get; set; }

        public Geography geography { get; set; }

        public bool isProvisional { get; set; }
        public bool hasClosures { get; set; }

        // public List<RoadDisruptionLine> RoadDisruptionLines { get; set; }
        // public List<RoadDisruptionImpactArea> RoadDisruptionImpactAreas { get; set; }
        // public List<RecurringSchedule> RecurringSchedules { get; set; }
    }

    public class Geography
    {
        
        public string type { get; set; }
        public List<double> coordinates { get; set; }
        
        public Crs crs { get; set; }
    }

    public class Crs
    {
        public string type { get; set; }
        
        public Dictionary<string, string> properties { get; set; }
    }

    // public class RoadDisruptionLine
    // {
    //     // Define additional properties if needed
    // }

    // public class RoadDisruptionImpactArea
    // {
    //     // Define additional properties if needed
    // }

    // public class RecurringSchedule
    // {
    //     // Define additional properties if needed
    // }
}