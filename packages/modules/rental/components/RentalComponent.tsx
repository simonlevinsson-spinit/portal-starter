import { getRentals } from "../api/RentalApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { Header } from "ui";
import * as React from "react";

export const RentalComponent = () => {
	const intl = useIntl();
	const queryClient = useQueryClient();
	const { isLoading, data: rentals } = useQuery({
		queryKey: ["rentals"],
		queryFn: getRentals,
	});

	// create a blue tailwind button that will invalidate the query
	// when clicked. This will cause the query to be refetched
	// and the component to be re-rendered



	return (
		<div className=" bg-blue-500 flex p-4">
			<Header title={intl.formatMessage({ id: "rental_title" })} />
			
			<button className=" rounded bg-blue-400 text-white"
				onClick={() => queryClient.invalidateQueries({ queryKey: ["rentals"] })}
			>
				Get Rentals
			</button>
			{!isLoading && JSON.stringify(rentals)}
		</div>
	);
};