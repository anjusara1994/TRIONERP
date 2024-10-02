using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TrionAPI;
using TrionAPI.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();
// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200", "https://anjusara1994.github.io")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddSingleton<IConfigurationService, ConfigurationService>();
builder.Services.AddTransient<DropdownDataService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        //ValidIssuer = "http://localhost:5242/",
        //ValidAudience = "http://localhost:4200/",
        ValidIssuers = new[] { "http://localhost:5242/", "https://coreconnectapi-g5h3c2bdaqetedfn.uaenorth-01.azurewebsites.net/" },
        ValidAudiences = new[] { "http://localhost:4200/", "https://anjusara1994.github.io/TRIONERP/" },
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3W5HYk2YPtWHD5Fhb0K+Qe1+jp4E4Qz+68Qz/9Eb6DA="))
    };
});

var app = builder.Build();
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "uploads")),
    RequestPath = "/uploads"
});

app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();


app.Run();

