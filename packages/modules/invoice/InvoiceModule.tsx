import * as React from "react";
import { useIntl } from "react-intl";
import { getInvoices } from "./api/InvoiceApi";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";

const Invoice = () => {
	const intl = useIntl();
	const [json, SetJson] = React.useState<string>();
	React.useEffect(() => {
		const fetchInvoices = async () => {
			const invoices = await getInvoices();
			SetJson(JSON.stringify(invoices));
		};
		fetchInvoices();
	}, []);

	return (
		<>
			<Header title={intl.formatMessage({ id: "invoice_title" })} />
			<button
				onClick={async () => {
					const invoices = await getInvoices();
					SetJson(JSON.stringify(invoices));
				}}
			>
				Get Invoices
			</button>
			{json}
		</>
	);
};

export const InvoiceModule: IModuleDefinition = {
	name: "Invoice",
	routes: [
		{
			path: "/invoice",
			component: <Invoice />,
		},
	],
	translations: { en: en, sv: sv },
};
