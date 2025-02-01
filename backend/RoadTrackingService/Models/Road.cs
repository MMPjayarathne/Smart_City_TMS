using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RoadTrackingService.Models
{
    public class Road
    {
        [Key]
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("type")]
        public string? Type { get; set; }


        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }

        [JsonPropertyName("statusSeverity")]
        public string StatusSeverity { get; set; }

        [JsonPropertyName("statusSeverityDescription")]
        public string StatusSeverityDescription { get; set; }

        [JsonPropertyName("bounds")]
        public string Bounds { get; set; }

        [JsonPropertyName("envelope")]
        public string Envelope { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }

    }
}