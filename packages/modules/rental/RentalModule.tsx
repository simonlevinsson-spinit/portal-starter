import * as React from "react";
import { useIntl } from "react-intl";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";
import { useMsal } from "@azure/msal-react";

const Rental = () => {
	const intl = useIntl();
	// get access token
	const { instance, accounts } = useMsal();
	const [json, SetJson] = React.useState<string>();

	React.useEffect(() => {
		const getToken = async () => {
			// const request = {
			// 	account: accounts[0],
			// 	scopes: ["api://0dd7a47e-0923-4558-9694-1d47a2a7395e/rental"],
			// };
			// const token = await instance.acquireTokenSilent(request);
			// // call api with access token
			// const response = await fetch("https://localhost:7098/Rental/", {
			// 	headers: {
			// 		Authorization: `Bearer ${token.accessToken}`,
			// 	},
			// });
			try {
				const response = await fetch("bff/rental/Rental/", {
					credentials: "include",
					redirect: "error",
				});
				const data = await response.json();
				SetJson(JSON.stringify(data));
			} catch (e) {
				location.reload();
			}
		};
		getToken();
	}, [instance, accounts]);

	return (
		<>
			<Header title={intl.formatMessage({ id: "rental_title" })} />
			{json}
		</>
	);
};

export const RentalModule: IModuleDefinition = {
	name: "Rental",
	routes: [
		{
			path: "/rental",
			component: Rental,
		},
	],
	translations: { en: en, sv: sv },
};
