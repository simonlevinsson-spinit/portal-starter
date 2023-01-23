import { authenticatedGet, viteConfig } from "shell";
const baseUrl = viteConfig.DEV ? "https://localhost:7098" : "/bff/rental";

export interface IRental {
  item: string;
  quantity: number;
}

export const getRentals = async (): Promise<IRental[]> => {
  const response = await authenticatedGet(`${baseUrl}/Rental`);
  return await response?.json();
};
