import * as React from "react";
import { useIntl } from "react-intl";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";
import { getRentals } from "./api/Api";

const Rental = () => {
	const intl = useIntl();
	// get access token
	const [json, SetJson] = React.useState<string>();
	React.useEffect(() => {
		const getToken = async () => {
			const t = await getRentals();
			SetJson(JSON.stringify(t));
		};
		getToken();
	}, []);

	return (
		<>
			<Header title={intl.formatMessage({ id: "rental_title" })} />
			<button
				onClick={async () => {
					const t = await getRentals();
					SetJson(JSON.stringify(t));
				}}
			>
				Get Rentals
			</button>
			{json}
		</>
	);
};

export const RentalModule: IModuleDefinition = {
	name: "Rental",
	routes: [
		{
			path: "/rental",
			component: <Rental />,
		},
	],
	translations: { en: en, sv: sv },
};
