// components
export { AppShell } from "./app-shell/AppShell";
export { authService } from "./authorization/AuthService";
export { authenticatedGet } from "./authorization/AuthenticatedFetch";

export interface IModuleDefinition {
  name: string;
  routes: IModulePath[];
  translations: {
    en: { [key: string]: string };
    sv: { [key: string]: string };
  };
}

interface IModulePath {
  path: string;
  component: JSX.Element;
  subPaths?: IModulePath[];
}

export const viteConfig: ImportMetaEnv = import.meta.env;
