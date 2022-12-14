using InvoiceModule.Api.Controllers;

using Microsoft.Identity.Web;


public class Program
{
#if DEBUG
    private const string DevelopmentCorsPolicyName = nameof(DevelopmentCorsPolicyName);
#endif

    public static async Task Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd");
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.OperationFilter<AuthorizeOperationFilter>();
            c.AddSecurityDefinition("oauth2", new SecurityScheme(builder.Configuration));
        });
#if DEBUG

        builder.Services.AddCors(options => { options.AddPolicy(name: DevelopmentCorsPolicyName, builder => { builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin(); }); });
#endif

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(setup =>
            {
                setup.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
                setup.SwaggerEndpoint($"/swagger/v1/swagger.json", "Version 1.0");
                setup.OAuthClientId(builder.Configuration["Swagger:ClientId"]);
                setup.OAuthAppName("MattiasTestApp");
                setup.OAuthScopeSeparator(" ");
                setup.OAuthUsePkce();
            });
        }

        app.UseHttpsRedirection();
#if DEBUG
        app.UseCors(DevelopmentCorsPolicyName);
#endif
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
