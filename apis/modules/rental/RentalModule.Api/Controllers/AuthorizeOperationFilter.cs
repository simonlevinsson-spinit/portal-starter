using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace InvoiceModule.Api.Controllers
{
    internal class AuthorizeOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var isAuthorized = context.MethodInfo.DeclaringType!.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any() ||
                             context.MethodInfo.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any();
            if (isAuthorized)
            {
                operation.Security.Add(new OpenApiSecurityRequirement
                {
                    { new OpenApiSecurityScheme{Reference = new OpenApiReference{Id="oauth2", Type = ReferenceType.SecurityScheme}}, Array.Empty<string>() }
                });
            }
        }
    }
}