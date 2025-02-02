using Microsoft.Extensions.Logging;
namespace WebSocketService.Logger
{
    public class LoggerService{

        public static ILogger GetLogger(){
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole(); 
                builder.AddDebug(); 
            });

            var logger = loggerFactory.CreateLogger<Program>();
            return logger;


        }

        
    }

}