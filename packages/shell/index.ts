// components
export { AppShell} from './app-shell/AppShell';
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
    component: () => React.ReactElement;
    subPaths?: IModulePath[];
  }
  