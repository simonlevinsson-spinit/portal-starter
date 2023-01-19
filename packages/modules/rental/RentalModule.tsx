import * as React from "react";
import { useIntl } from "react-intl";
import { IModuleDefinition } from "shell";
import { Header } from "ui";
import en from "./translations/en.json";
import sv from "./translations/sv.json";
import { getRentals } from "./api/RentalApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Rental = () => {
	const intl = useIntl();
	const queryClient = useQueryClient();
	const { isLoading, data: rentals } = useQuery({
		queryKey: ["rentals"],
		queryFn: getRentals,
	});

	return (
		<>
			<Header title={intl.formatMessage({ id: "rental_title" })} />
			<button
				onClick={() => queryClient.invalidateQueries({ queryKey: ["rentals"] })}
			>
				Get Rentals
			</button>
			{!isLoading && JSON.stringify(rentals)}
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
