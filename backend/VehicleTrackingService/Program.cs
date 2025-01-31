using VehicleTrackingService.Data;
using VehicleTrackingService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<VehicleDbContext>(options =>
    options.UseMySQL(connectionString)); 


using (var scope = builder.Services.BuildServiceProvider().CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<VehicleDbContext>();
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