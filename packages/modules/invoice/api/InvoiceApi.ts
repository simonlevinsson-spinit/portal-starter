import { authenticatedGet, viteConfig } from "shell";
const baseUrl = "https://localhost:7099";

export const getInvoices = async () => {
  const url = viteConfig.DEV
    ? `${baseUrl}/Invoice`
    : "/bff/invoice/Invoice";

  const response = await authenticatedGet(url);
  return await response?.json();
};
