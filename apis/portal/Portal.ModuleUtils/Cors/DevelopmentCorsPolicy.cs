using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Portal.ModuleUtils.Cors;

public static class DevelopmentCorsPolicy
{
#if DEBUG
    private const string DevelopmentCorsPolicyName = nameof(DevelopmentCorsPolicyName);
#endif

    public static void AddDevelopmentCorsPolicy(this IServiceCollection services)
    {
#if DEBUG

        services.AddCors(options => { options.AddPolicy(name: DevelopmentCorsPolicyName, builder => { builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin(); }); });
#endif
    }

    public static void UseDevelopmentCorsPolicy(this WebApplication app)
    {
#if DEBUG
        app.UseCors(DevelopmentCorsPolicyName);
#endif
    }
}