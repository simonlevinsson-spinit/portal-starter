import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { IModuleDefinition } from "..";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authorization/authConfig";
import { Layout } from "../layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface AppShellProps {
	moduleDefinitions: IModuleDefinition[];
}

const msalInstance = new PublicClientApplication(msalConfig);

export const AppShell = (props: AppShellProps) => {
	const [usersLocale, setUsersLocale] = React.useState(true);

	const queryClient = new QueryClient();

	// get all transaltions from all modules and merge them into one object
	const translations = props.moduleDefinitions.reduce((acc, module) => {
		acc = { ...acc, ...module.translations[usersLocale ? "sv" : "en"] };
		return acc;
	}, {});

	return (
		<MsalProvider instance={msalInstance}>
			<IntlProvider locale={usersLocale ? "sv" : "en"} messages={translations}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Layout setUsersLocale={setUsersLocale} {...props}>
							<Routes>
								{props.moduleDefinitions.map((module) => (
									<Route
										key={module.name}
										path={module.routes[0].path}
										element={module.routes[0].component}
									/>
								))}
							</Routes>
						</Layout>
					</BrowserRouter>
				</QueryClientProvider>
			</IntlProvider>
		</MsalProvider>
	);
};
