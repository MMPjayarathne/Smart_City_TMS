using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebSocketService.Services;

namespace WebSocketService.Services
{
    public class KafkaConsumerService : BackgroundService
    {
        private readonly IConsumer<Ignore, string> _consumer;
        private readonly WebSocketsService _webSocketsService;
        private readonly ILogger<KafkaConsumerService> _logger;

        public KafkaConsumerService(WebSocketsService webSocketsService, ILogger<KafkaConsumerService> logger)
        {
            _webSocketsService = webSocketsService;
            _logger = logger;

            var config = new ConsumerConfig
            {
                BootstrapServers = "localhost:9092",
                GroupId = "road-tracking-group",
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            _consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Kafka Consumer Service started.");
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken); // Delay to ensure app is fully initialized

            // Subscribe to multiple Kafka topics
            _consumer.Subscribe(new[] { "bus-line-status", "road-distruptions", "road-details" });

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var consumeResult = _consumer.Consume(TimeSpan.FromSeconds(2)); // Poll messages periodically
                    if (consumeResult != null && consumeResult.Message != null)
                    {
                        var data = JsonSerializer.Deserialize<object>(consumeResult.Message.Value);
                        // _logger.LogInformation($"Kafka message received: {data}");

                        // Broadcast updates based on the topic
                        switch (consumeResult.Topic)
                        {
                            case "bus-line-status":
                                 _logger.LogInformation($"Before pushing to web socket");
                                await _webSocketsService.BroadcastUpdateAsync("bus-line-status", data);
                                break;

                            case "road-distruptions":
                                await _webSocketsService.BroadcastUpdateAsync("road-distruptions", data);
                                break;

                            case "road-details":
                                await _webSocketsService.BroadcastUpdateAsync("road-details", data);
                                break;
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    _logger.LogInformation("Kafka Consumer Service stopping...");
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error in Kafka Consumer: {ex.Message}");
                }

                await Task.Delay(TimeSpan.FromSeconds(2), stoppingToken); // Prevent tight loops
            }

            _consumer.Close();
        }
    }
}
