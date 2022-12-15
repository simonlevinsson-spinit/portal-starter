import * as React from "react";
import { useIntl } from "react-intl";
import { useMsal } from "@azure/msal-react";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";


const Invoice = () => {
	const intl = useIntl();
	// get access token
	const { instance, accounts } = useMsal();
	const [json,SetJson] = React.useState<string>();
	
	React.useEffect(() => {
		const getToken = async () => {
			const request = {
				account: accounts[0],
				scopes: ["api://dd6ddc4f-e061-41e3-b3bd-2cf4bdb85a57/portal"],
			};
			const token = await instance.acquireTokenSilent(request);
			// call api with access token
			const response = await fetch("https://localhost:7099/WeatherForecast/", {
				headers: {
					Authorization: `Bearer ${token.accessToken}`,
				},
			});
			const data = await response.json();
			SetJson(JSON.stringify(data));
		};
		getToken();
	}, [instance, accounts]);
	
	return <><Header title={intl.formatMessage({ id: "invoice_title" })} />
	{json}
	</>;
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
