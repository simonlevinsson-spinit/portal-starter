import * as React from "react";
import { useIntl } from "react-intl";
import { getInvoices } from "./api/InvoiceApi";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Invoice = () => {
	const intl = useIntl();
	const queryClient = useQueryClient();
	const { isLoading, data: rentals } = useQuery({
		queryKey: ["invoices"],
		queryFn: getInvoices,
	});

	return (
		<>
			<Header title={intl.formatMessage({ id: "invoice_title" })} />
			<button className="rounded bg-blue-400 text-white p-4 mt-6"
				onClick={() => queryClient.invalidateQueries({ queryKey: ["invoices"] })}
			>
				Get Invoices
			</button>
			{!isLoading && JSON.stringify(rentals)}
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
