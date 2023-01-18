import { authenticatedGet, viteConfig } from "shell";
const baseUrl = "https://localhost:7098";

export const getRentals = async () => {
  const url = viteConfig.DEV
    ? `${baseUrl}/Rental`
    : "/bff/rental/Rental";

  const response = await authenticatedGet(url);
  return await response?.json();
};
