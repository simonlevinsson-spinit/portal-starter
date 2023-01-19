import { authenticatedGet, viteConfig } from "shell";
const baseUrl = viteConfig.DEV ? "https://localhost:7099" : "/bff/invoice";

export interface IInvoice {
  dueDate: DueDate;
  amount: number;
}

export interface DueDate {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  dayOfYear: number;
  dayNumber: number;
}

export const getInvoices = async (): Promise<IInvoice> => {
  const response = await authenticatedGet(`${baseUrl}/Invoice`);
  return await response?.json();
};
