import * as React from "react";
import { IModuleDefinition } from "shell";
import { RentalComponent } from "./components/RentalComponent";
import en from "./translations/en.json";
import sv from "./translations/sv.json";

export const RentalModule: IModuleDefinition = {
  name: "Rental",
  routes: [
    {
      path: "/rental",
      component: <RentalComponent />,
    },
  ],
  translations: { en: en, sv: sv },
};
