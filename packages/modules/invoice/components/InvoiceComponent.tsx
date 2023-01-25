import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "ui";
import { getInvoices } from "../api/InvoiceApi";
import { useIntl } from "react-intl";
import * as React from "react";

const queryKey = ["invoices"];

export const InvoiceComponent = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { isLoading, data: rentals } = useQuery({
    queryKey,
    queryFn: getInvoices,
  });

  return (
    <>
      <Header title={intl.formatMessage({ id: "invoice_title" })} />
      <button
        className="mt-6 rounded bg-blue-400 p-4 text-white"
        onClick={() => queryClient.invalidateQueries({ queryKey })}
        >
        Get Invoices
      </button>
      {!isLoading && JSON.stringify(rentals)}
    </>
  );
};
