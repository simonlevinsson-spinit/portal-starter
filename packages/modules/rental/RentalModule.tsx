import * as React from "react";
import { useIntl } from "react-intl";
import { Header } from "ui";
import { IModuleDefinition } from "../index";
import en from "./translations/en.json";
import sv from "./translations/sv.json";

const Rental = () => {
	const intl = useIntl();
	return <Header title={intl.formatMessage({id: "rental_title"})} />;
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
