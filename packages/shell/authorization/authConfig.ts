import { Configuration, RedirectRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "958c09b8-bd7e-420d-8e56-21189cd5a679",
        authority: "https://spinitramirentportal.b2clogin.com/tfp/spinitramirentportal.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN",
        knownAuthorities: ["spinitramirentportal.b2clogin.com"],
        redirectUri: window.location.origin,
        postLogoutRedirectUri: "/"
    }
};

  // Add scopes for the ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest: RedirectRequest  = {
    scopes: ["https://spinitramirentportal.onmicrosoft.com/api/api_access"],
  };

  export const tokenRequest: RedirectRequest  = {
    scopes: ["https://spinitramirentportal.onmicrosoft.com/api/api_access"]
  };