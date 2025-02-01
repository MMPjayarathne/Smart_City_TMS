using System;
using System.Collections.Generic;
using System.Linq;
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
            string url = "https://api.tfl.gov.uk/line/mode/bus/status"; 
            var busLineStatuses = await FetchApiData<List<BusLineStatus>>(url);

            if (busLineStatuses == null || !busLineStatuses.Any())
            {
                _logger.LogWarning("No active bus line statuses found!");
                return new List<BusLineStatus>();
            }

            return busLineStatuses
                .Where(busLineState => busLineState.lineStatuses
                    .Any(lineState => lineState.validityPeriods
                        .Any(validityPeriod => validityPeriod.isNow)))
                .ToList();
        }

        public async Task<List<RoadDisruption>> FetchRoadDisruptionsAsync()
        {
            string disruptionUrl = "https://api.tfl.gov.uk/road/a1/disruption"; 
            var disruptions = await FetchApiData<List<RoadDisruption>>(disruptionUrl);
            
            if (disruptions == null || !disruptions.Any())
            {
                _logger.LogWarning("No roads found!");
                return new List<RoadDisruption>();
            }

        
            return disruptions;
        }


        public async Task<List<Road>> FetchRoadDetailsAsync()
        {
            string url = "https://api.tfl.gov.uk/road";
            var roadDetails = await FetchApiData<List<Road>>(url);

            if (roadDetails == null || !roadDetails.Any())
            {
                _logger.LogWarning("No road details available!");
                return new List<Road>();
            }

            return roadDetails;
        }

        // public string DisruptionDescriptionBuilder(List<Disruption> disruptions)
        // {
        //     if (disruptions == null || !disruptions.Any())
        //     {
        //         return "No active disruptions.";
        //     }

        //     return string.Join(" | ", disruptions
        //         .Where(d => !string.IsNullOrEmpty(d.description))
        //         .Select(d => d.description));
        // }

        private async Task<T> FetchApiData<T>(string url)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"Error fetching data from {url}: {response.StatusCode}");
                return default;
            }

            string responseBody = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<T>(responseBody);

            if (data == null)
            {
                _logger.LogWarning($"No data found for {url}");
            }

            return data;
        }
    }
}
