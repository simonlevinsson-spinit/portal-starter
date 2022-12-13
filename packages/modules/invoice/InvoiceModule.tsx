import * as React from "react";
import { useIntl } from "react-intl";
import { Header } from "ui";
import { IModuleDefinition } from "../index";
import en from "./translations/en.json";
import sv from "./translations/sv.json";

const Invoice = () => {
	const intl = useIntl();
	return <Header title={intl.formatMessage({ id: "invoice_title" })} />;
};

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
