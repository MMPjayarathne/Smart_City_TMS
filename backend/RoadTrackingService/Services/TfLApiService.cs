using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using RoadTrackingService.Logger;
using RoadTrackingService.Models;

namespace RoadTrackingService.Services
{
    public class TfLApiService
    {
        private readonly HttpClient _httpClient;
        private static readonly ILogger _logger = LoggerService.GetLogger();

        public TfLApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<BusLineStatus>> FetchLiveBusLineStatusAsync()
        {
            string url = "https://api.tfl.gov.uk/line/mode/bus/status"; // TfL API Endpoint for Bus locations

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error fetching TfL data: {response.StatusCode}");
            }

            string responseBody = await response.Content.ReadAsStringAsync();
            var busLineStatuses = JsonSerializer.Deserialize<List<BusLineStatus>>(responseBody);
            if(busLineStatuses == null){
                _logger.LogWarning("Vehicles are Empty!");
            }

            // var vehicleLocations = new List<VehicleLocation>();
            // _logger.LogInformation($"The vehicle list: {string.Join(", ", vehicleLocations.Select(v => v.ToString()))}");
            
            // foreach (var vehicle in vehicles)
            
            // {
            //     vehicleLocations.Add(new VehicleLocation
            //     {
            //         VehicleId = vehicle.Id,
            //         LineName = vehicle.LineName,
            //         Latitude = vehicle.Latitude,
            //         Longitude = vehicle.Longitude,
            //         DisruptionDescription = DisruptionDescriptionBuilder(vehicle.Disruptions),
            //         Speed = vehicle.Speed,
            //         Timestamp = DateTime.UtcNow
            //     });
            // }

            return busLineStatuses;
        }

       public string DisruptionDescriptionBuilder(List<Disruption> disruptions)
        {
            // Initialize a list to store disruption descriptions
            List<string> disruptionDescriptions = new List<string>();

            // Loop through the disruptions and collect disruption descriptions
            foreach (var disruption in disruptions)
            {
                if (!string.IsNullOrEmpty(disruption.description))
                {
                    disruptionDescriptions.Add(disruption.description);
                }
            }

            // Concatenate the disruption descriptions with colon separators
            var result = string.Join(":", disruptionDescriptions);

            return result;
        }



    }


}
