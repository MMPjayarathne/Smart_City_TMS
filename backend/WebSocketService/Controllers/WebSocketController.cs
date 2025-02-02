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

        [HttpGet("live-updates")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                await _webSocketsService.HandleWebSocket(HttpContext, webSocket);
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}
