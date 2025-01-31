using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleTrackingService.Models
{
    public class BusLineStatus
    {
        [Key]
        public string id { get; set; }
        public string name { get; set; }
        public string modeName { get; set; }
        public List<LineStatus> lineStatuses { get; set; }
        public List<ServiceType> serviceTypes { get; set; }
        // public Crowding Crowding { get; set; }
        public List<Disruption> disruptions { get; set; }
        public DateTime created { get; set; }
        public DateTime modified { get; set; }
        // public List<RouteSection> RouteSections { get; set; }
    }

    public class LineStatus
    {
        [Key]
        public int id { get; set; }
        public int statusSeverity { get; set; }
        public string statusSeverityDescription { get; set; }
        public DateTime created { get; set; }
        public List<ValidityPeriod> validityPeriods { get; set; }
    }

    public class ServiceType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id {get;set;}
        public string name { get; set; }
        public string uri { get; set; }
    }

    // public class Crowding
    // {
    //     // Crowding details can be expanded based on the specific attributes
    // }

    public class Disruption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id {get;set;}
        public string category { get; set; }
        public string categoryDescription { get; set; }
        public string description { get; set; }
        public DateTime created { get; set; }
        public List<string> affectedRoutes { get; set; }
        public List<string> affectedStops { get; set; }
    }

    public class ValidityPeriod
    {
         [Key]
         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id {get;set;}
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public bool isNow { get; set; }
    }

    // public class RouteSection
    // {
    //     // Define properties based on route section details if needed
    // }
}
