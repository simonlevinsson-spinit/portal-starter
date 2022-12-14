import React from "react";
import {
	RouterProvider,
	createReactRouter,
	createRouteConfig,
} from "@tanstack/react-router";
import { IntlProvider } from "react-intl";
import { IModuleDefinition } from "..";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authorization/authConfig";
import { Layout } from "../layout/Layout";

export interface AppShellProps {
	moduleDefinitions: IModuleDefinition[];
	withoutLogin?: boolean;
}

const msalInstance = new PublicClientApplication(msalConfig);

export const AppShell = (props: AppShellProps) => {
	const [usersLocale, setUsersLocale] = React.useState(true);

	const rootRoute = createRouteConfig({
		component: () => <Layout setUsersLocale={setUsersLocale} {...props} />,
	});

	const routeConfig = rootRoute.addChildren(
		props.moduleDefinitions.map((module) =>
			rootRoute.createRoute({
				path: module.routes[0].path,
				component: module.routes[0].component,
			}),
		),
	);

	const router = createReactRouter({ routeConfig });

	// get all transaltions from all modules and merge them into one object
	const translations = props.moduleDefinitions.reduce((acc, module) => {
		acc = { ...acc, ...module.translations[usersLocale ? "sv" : "en"] };
		return acc;
	}, {});

	return (
		<MsalProvider instance={msalInstance}>
			<IntlProvider locale={usersLocale ? "sv" : "en"} messages={translations}>
				<RouterProvider router={router} />
			</IntlProvider>
		</MsalProvider>
	);
};
