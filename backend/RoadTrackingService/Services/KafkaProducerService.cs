using Confluent.Kafka;
using Newtonsoft.Json;
using RoadTrackingService.Logger;
using RoadTrackingService.Models;

namespace RoadTrackingService.Services
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
        public async Task sendMessageAsync<T>(string topic, List<T> listItems)
        {
            // Serialize the list of items to JSON and sending the Whole list
            var message = JsonConvert.SerializeObject(listItems);
            await _producer.ProduceAsync(topic,new Message<Null, string> {Value = message});
            _logger.LogInformation($"Pushed message to the topic {topic}");

        }
    }
}