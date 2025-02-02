using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebSocketService.Services
{
    public class WebSocketsService
    {
        private readonly List<WebSocket> _clients = new List<WebSocket>();

        public async Task HandleWebSocket(HttpContext context, WebSocket webSocket)
        {
            _clients.Add(webSocket);
            while (webSocket.State == WebSocketState.Open)
            {
                await Task.Delay(1000);
            }
            _clients.Remove(webSocket);
        }

        public async Task BroadcastUpdateAsync(object update)
        {
            string message = JsonSerializer.Serialize(update);
            var buffer = Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(buffer);

            foreach (var client in _clients)
            {
                if (client.State == WebSocketState.Open)
                {
                    await client.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }
    }
}
