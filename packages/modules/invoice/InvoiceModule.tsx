import * as React from "react";
import { useIntl } from "react-intl";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";

const Invoice = () => {
	const intl = useIntl();
	return <Header title={intl.formatMessage({ id: "invoice_title" })} />;
};
//h
export const InvoiceModule: IModuleDefinition = {
	name: "Invoice",
	routes: [
		{
			path: "/invoice",
			component: Invoice,
		},
	],
	translations: { en: en, sv: sv },
};
