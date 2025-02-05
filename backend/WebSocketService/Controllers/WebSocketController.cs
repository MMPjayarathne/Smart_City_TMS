using System.Net.WebSockets;
using Microsoft.AspNetCore.Mvc;
using WebSocketService.Services;

namespace WebSocketService.Controllers
{
    [Route("ws")]
    [ApiController]
    public class WebSocketController : ControllerBase
    {
        private readonly WebSocketsService _webSocketsService;

        public WebSocketController(WebSocketsService webSocketsService)
        {
            _webSocketsService = webSocketsService;
        }

        [HttpGet("live-busline-updates")]
        public async Task GetBusLine()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await _webSocketsService.HandleWebSocket(HttpContext, webSocket, "bus-line-status");
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        [HttpGet("live-road-distruptions")]
        public async Task GetRoadDisruptions()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await _webSocketsService.HandleWebSocket(HttpContext, webSocket, "road-distruptions");
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        [HttpGet("live-road-details")]
        public async Task GetRoadDetails()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await _webSocketsService.HandleWebSocket(HttpContext, webSocket, "road-details");
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}
