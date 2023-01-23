import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";

export class AuthenticationService {
  constructor() {
    this.account = null;
    if (import.meta.env.DEV) {
      this.app = new PublicClientApplication(msalConfig);
    } else {
      this.app = null;
    }
  }

  init: () => Promise<boolean> = async () => {
    if (this.app) {
      const response = await this.app.handleRedirectPromise();
      if (response === null) {
        // In case multiple accounts exist, you can select
        const currentAccounts = this.app.getAllAccounts();

        if (!currentAccounts || currentAccounts.length === 0) {
          // no accounts signed-in, attempt to sign a user in
          this.app.loginRedirect(loginRequest);
        } else {
          this.account = currentAccounts[0];
          return true;
        }
      } else {
        if (response.account !== null) {
          this.account = response.account;
          return true;
        } else {
          console.log("No account in response");
          this.app.loginRedirect(loginRequest);
        }
      }

      return false;
    } else {
      return true;
    }
  };

  public app: PublicClientApplication | null;
  public account: AccountInfo | null;
}

export const authService = new AuthenticationService();
