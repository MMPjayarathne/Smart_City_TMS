using RoadTrackingService.Data;
using RoadTrackingService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<RoadDbContext>(options =>
    options.UseMySQL(connectionString)
    .EnableSensitiveDataLogging(false)
            .LogTo(_ => { }, LogLevel.Warning)); 


using (var scope = builder.Services.BuildServiceProvider().CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<RoadDbContext>();
    dbContext.Database.EnsureCreated(); 
}


builder.Services.AddHttpClient<TfLApiService>();
builder.Services.AddSingleton<KafkaProducerService>();
builder.Services.AddHostedService<BusLineService>();

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

app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();