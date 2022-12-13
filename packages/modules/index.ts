import React from "react";
export { RentalModule } from "./rental/RentalModule";
export { InvoiceModule } from "./invoice/InvoiceModule";

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
