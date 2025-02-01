
using Microsoft.EntityFrameworkCore;
using RoadTrackingService.Data;
using RoadTrackingService.Models;
using RoadTrackingService.Logger;
namespace RoadTrackingService.Services
{
    public class BusLineService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

         private static readonly ILogger _logger = LoggerService.GetLogger();

        public BusLineService(IServiceProvider serviceProvider){

            _serviceProvider = serviceProvider;

        }

        protected override async Task ExecuteAsync(System.Threading.CancellationToken stoppingToken)
        {
        
            while (!stoppingToken.IsCancellationRequested){
                using (var scope = _serviceProvider.CreateScope()){
                    var dbContext = scope.ServiceProvider.GetRequiredService<RoadDbContext>();
                    var tflService = scope.ServiceProvider.GetRequiredService<TfLApiService>();
                    var kafkaProducer = scope.ServiceProvider.GetRequiredService<KafkaProducerService>();

                    var busLineStatuses  = await tflService.FetchLiveBusLineStatusAsync();
                    var disruptions = await tflService.FetchRoadDisruptionsAsync();
                    var roadDetails = await tflService.FetchRoadDetailsAsync();

                    if(busLineStatuses.Count > 0){
                        try{

                            await kafkaProducer.sendMessageAsync("bus-line-status",busLineStatuses);
                            await kafkaProducer.sendMessageAsync("road-distruptions",disruptions);
                            await kafkaProducer.sendMessageAsync("road-details",roadDetails);
                    
                            await dbContext.BusLineStatus.AddRangeAsync(busLineStatuses);
                            // Detach existing Road entities if they are already tracked
                            foreach (var existingRoad in dbContext.Roads.ToList())
                            {
                                if (roadDetails.Any(rd => rd.Id == existingRoad.Id))
                                {
                                    dbContext.Entry(existingRoad).State = EntityState.Detached;
                                }
                            }

                            // Detach existing RoadDisruption entities if they are already tracked
                            foreach (var existingDisruption in dbContext.RoadDisruptions.ToList())
                            {
                                if (disruptions.Any(d => d.id == existingDisruption.id))
                                {
                                    dbContext.Entry(existingDisruption).State = EntityState.Detached;
                                }
                            }

                            // Add new unique Road and RoadDisruption entities
                            var newRoads = roadDetails.Where(r => !dbContext.Roads.Any(existing => existing.Id == r.Id)).ToList();
                            var newDisruptions = disruptions.Where(d => !dbContext.RoadDisruptions.Any(existing => existing.id == d.id)).ToList();

                            // Add new entries to the database
                            await dbContext.Roads.AddRangeAsync(newRoads);
                            await dbContext.RoadDisruptions.AddRangeAsync(newDisruptions);
                            await dbContext.SaveChangesAsync();
                        }catch (DbUpdateException ex)
                        {
                            _logger.LogWarning($"Error adding roads: {ex.InnerException?.Message}");
                        }


                       
                    }
                }

                await Task.Delay(TimeSpan.FromMinutes(1),stoppingToken); // this will handlle the fetching, every one miniutes
            }
        }


    }
}