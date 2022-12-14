using Microsoft.OpenApi.Models;

internal class SecurityScheme : OpenApiSecurityScheme
{
    public SecurityScheme(IConfiguration configuration)
    {
        Type = SecuritySchemeType.OAuth2;
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri($"https://login.microsoftonline.com/{configuration["AzureAD:TenantId"]}/oauth2/v2.0/authorize"),
                TokenUrl = new Uri($"https://login.microsoftonline.com/{configuration["AzureAD:TenantId"]}/oauth2/v2.0/token"),
                Scopes = new Dictionary<string, string>
                    {
                        { "openid", "" },
                        { $"api://{configuration["AzureAD:ClientId"]}/portal", "" }
                    }
            }
        };
    }
}
