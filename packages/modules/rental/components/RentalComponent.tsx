import { getRentals } from "../api/RentalApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIntl } from "react-intl";
import { Header } from "ui";
import * as React from "react";

const queryKey = ["rentals"];

export const RentalComponent = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { isLoading, data: rentals } = useQuery({
    queryKey,
    queryFn: getRentals,
  });
  return (
    <>
      <Header title={intl.formatMessage({ id: "rental_title" })} />

      <button
        className="mt-6 rounded bg-blue-400 p-4 text-white"
        onClick={() => queryClient.invalidateQueries({ queryKey })}
      >
        Get Rentals
      </button>
      {!isLoading && JSON.stringify(rentals)}
    </>
  );
};
