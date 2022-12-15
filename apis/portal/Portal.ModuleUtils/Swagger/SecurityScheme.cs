using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

namespace Portal.ModuleUtils.Swagger;

public class SecurityScheme : OpenApiSecurityScheme
{
    public SecurityScheme(IConfiguration configuration, string configSectionName, string moduleScope)
    {
        var section = configuration.GetSection(configSectionName);
        Type = SecuritySchemeType.OAuth2;
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri($"https://login.microsoftonline.com/{section["TenantId"]}/oauth2/v2.0/authorize"),
                TokenUrl = new Uri($"https://login.microsoftonline.com/{section["TenantId"]}/oauth2/v2.0/token"),
                Scopes = new Dictionary<string, string>
                    {
                        { "openid", "" },
                        { $"api://{section["ClientId"]}/{moduleScope}", "" }
                    }
            }
        };
    }
}
