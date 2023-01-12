using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web;

using System.Net;

using Yarp.ReverseProxy.Transforms;

var builder = WebApplication.CreateBuilder(args);
var scope = builder.Configuration["AspNetCoreProxy:ScopeForAccessToken"] ?? string.Empty;
builder.Services
    .AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi(new string[] { scope })
    .AddInMemoryTokenCaches();

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});


builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddTransforms(builderContext =>
    {
        builderContext.AddRequestTransform(async transformContext =>
        {
            try
            {
                var tokenAcquisition = transformContext.HttpContext.RequestServices.GetRequiredService<ITokenAcquisition>();
                var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(new string[] { scope });
                transformContext.ProxyRequest.Headers.Add("Authorization", $"Bearer {accessToken}");
            }
            catch (Exception)
            {
            }
        });

        builderContext.AddResponseTransform(context =>
        {
            if (context.ProxyResponse?.StatusCode == HttpStatusCode.Unauthorized)
            {
                context.HttpContext.Response.Cookies.Delete(".AspNetCore.Cookies");
            }

            return ValueTask.CompletedTask;
        });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();
app.MapFallbackToFile("index.html", new StaticFileOptions
{
    OnPrepareResponse = context =>
    {
        if (context.File.Name == "index.html")
        {
            context.Context.Response.Headers.Add("Cache-Control", "no-cache, no-store");
            context.Context.Response.Headers.Add("Expires", "-1");
        }
    }
});
app.MapReverseProxy();
app.Run();
