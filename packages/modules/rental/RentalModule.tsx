import * as React from "react";
import { useIntl } from "react-intl";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";
import { getRentals } from "./api/RentalApi";

const Rental = () => {
	const intl = useIntl();
	const [json, SetJson] = React.useState<string>();
	React.useEffect(() => {
		const fetchRentals = async () => {
			const rentals = await getRentals();
			SetJson(JSON.stringify(rentals));
		};
		fetchRentals();
	}, []);

	return (
		<>
			<Header title={intl.formatMessage({ id: "rental_title" })} />
			<button
				onClick={async () => {
					const rentals = await getRentals();
					SetJson(JSON.stringify(rentals));
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
