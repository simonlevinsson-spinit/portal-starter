import * as React from "react";
import { IModuleDefinition } from "shell";
import en from "./translations/en.json";
import sv from "./translations/sv.json";
import { InvoiceComponent } from "./components/InvoiceComponent";

export const InvoiceModule: IModuleDefinition = {
	name: "Invoice",
	routes: [
		{
			path: "/invoice",
			component: <InvoiceComponent />,
		},
	],
	translations: { en: en, sv: sv },
};
