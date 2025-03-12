using Microsoft.EntityFrameworkCore;
using TaskWebApi;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:4200")  // Allow Angular app from localhost:4200
              .AllowAnyMethod()                     // Allow all HTTP methods (GET, POST, etc.)
              .AllowAnyHeader());                   // Allow any headers
});
builder.Services.AddControllers();
//swagger servises
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbHost = "localhost";
var dbName = "dms_task";
var dbPassword = "1234567890";
var connectionString = $"server={dbHost};port=3306;database={dbName};user=root;password={dbPassword}";
builder.Services.AddDbContext<TaskDbContext>(o => o.UseMySQL(connectionString));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAngularApp");
app.UseRouting();
app.MapControllers();

app.Run();
