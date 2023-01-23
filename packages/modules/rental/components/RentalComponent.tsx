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
    <>
      <Header title={intl.formatMessage({ id: "rental_title" })} />

      <button
        className="mt-6 rounded bg-blue-400 p-4 text-white"
        onClick={() => queryClient.invalidateQueries({ queryKey: ["rentals"] })}
      >
        Get Rentals
      </button>
      {!isLoading && JSON.stringify(rentals)}
    </>
  );
};
