using Confluent.Kafka;
using Newtonsoft.Json;
using VehicleTrackingService.Logger;
using VehicleTrackingService.Models;

namespace VehicleTrackingService.Services
{
    public class KafkaProducerService
    {
        private readonly IProducer<Null, String> _producer;
         private static readonly ILogger _logger = LoggerService.GetLogger();


        public KafkaProducerService(){
            var config = new ProducerConfig{
                BootstrapServers = "localhost:9092"
            };
            _producer = new ProducerBuilder<Null, string>(config).Build();
        }
        public async Task sendMessageAsync(List<BusLineStatus> busLineStatusesList)
        {
            foreach(var busLineStatuses in busLineStatusesList){
                var message = JsonConvert.SerializeObject(busLineStatuses);
                await _producer.ProduceAsync("bus-line-status",new Message<Null, string> {Value = message});
                _logger.LogInformation("Pushed message to the bus-line-status");

            }
        }
    }
}