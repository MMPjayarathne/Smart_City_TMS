
using WebSocketService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<WebSocketsService>();
builder.Services.AddHostedService<KafkaConsumerService>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





var app = builder.Build();
// Configure the request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseWebSockets();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();