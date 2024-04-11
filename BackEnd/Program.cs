using System.Text.Json.Serialization;
using backend.Config;
using BackEnd.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add services to the container.

var JwtSecurityScheme = new OpenApiSecurityScheme()
{
    Type = SecuritySchemeType.Http,
    Scheme = "bearer"
};
var JwtSecurityRequirement = new OpenApiSecurityRequirement()
{
    [new() { Reference = new() { Type = ReferenceType.SecurityScheme, Id = "Bearer" } }] = []
};
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", JwtSecurityScheme);
    options.AddSecurityRequirement(SecurityConfig.JwtSecurityRequirement);
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "*",
                      policy =>
                      {
                          policy.WithOrigins("*");
                      });
});

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.Authority = "https://accounts.google.com";
    options.Audience = "750732784067-14h3shhdhie1gi8i45o1otpm6r663b6k.apps.googleusercontent.com";
});

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

var app = builder.Build();
app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                                                        //.WithOrigins("https://localhost:44351")); // Allow only this origin can also have multiple origins separated with comma
                    .AllowCredentials());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();