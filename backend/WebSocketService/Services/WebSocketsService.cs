using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WebSocketService.Logger;

namespace WebSocketService.Services
{
    public class WebSocketsService
    {
        private readonly Dictionary<string, List<WebSocket>> _topicClients = new Dictionary<string, List<WebSocket>>();
        private static readonly ILogger _logger = LoggerService.GetLogger();

        public async Task HandleWebSocket(HttpContext context, WebSocket webSocket, string topic)
        {
            if (!_topicClients.ContainsKey(topic))
            {
                _topicClients[topic] = new List<WebSocket>();
            }

            _topicClients[topic].Add(webSocket);

            while (webSocket.State == WebSocketState.Open)
            {
                await Task.Delay(1000); // Wait for data
            }

            _topicClients[topic].Remove(webSocket);
        }

        public async Task BroadcastUpdateAsync(string topic, object update)
        {
            if (!_topicClients.ContainsKey(topic))
            {
                return; // No clients for this topic
            }

            string message = JsonSerializer.Serialize(update);

            _logger.LogInformation($"Broadcasting update to {topic} clients");
            var buffer = Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(buffer);

            foreach (var client in _topicClients[topic])
            {
                if (client.State == WebSocketState.Open)
                {
                    await client.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }
    }
}
