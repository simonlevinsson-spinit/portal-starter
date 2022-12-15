using Microsoft.Identity.Web;

using Portal.ModuleUtils.Cors;
using Portal.ModuleUtils.Swagger;

public class Program
{


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
            c.AddSecurityDefinition("oauth2", new SecurityScheme(builder.Configuration, "AzureAd", "rental"));
        });
        builder.Services.AddDevelopmentCorsPolicy();

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
                setup.OAuthAppName("PortalReferenceRentalModule");
                setup.OAuthScopeSeparator(" ");
                setup.OAuthUsePkce();
            });
        }

        app.UseHttpsRedirection();
        app.UseDevelopmentCorsPolicy();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
