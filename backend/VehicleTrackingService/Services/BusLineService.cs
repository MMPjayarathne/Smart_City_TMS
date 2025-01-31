

using VehicleTrackingService.Data;
using VehicleTrackingService.Models;

namespace VehicleTrackingService.Services
{
    public class BusLineService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public BusLineService(IServiceProvider serviceProvider){

            _serviceProvider = serviceProvider;

        }

        protected override async Task ExecuteAsync(System.Threading.CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested){
                using (var scope = _serviceProvider.CreateScope()){
                    var dbContext = scope.ServiceProvider.GetRequiredService<VehicleDbContext>();
                    var tflService = scope.ServiceProvider.GetRequiredService<TfLApiService>();
                    var kafkaProducer = scope.ServiceProvider.GetRequiredService<KafkaProducerService>();

                    var busLineStatuses  = await tflService.FetchLiveBusLineStatusAsync();

                    if(busLineStatuses.Count > 0){

                        await dbContext.BusLineStatus.AddRangeAsync(busLineStatuses);
                        await dbContext.SaveChangesAsync();
                        await kafkaProducer.sendMessageAsync(busLineStatuses);
                    }
                }

                await Task.Delay(TimeSpan.FromMinutes(1),stoppingToken); // this will handlle the fetching, every one miniutes
            }
        }


    }
}