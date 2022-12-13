import React from "react";
import {
	Outlet,
	RouterProvider,
	Link,
	createReactRouter,
	createRouteConfig,
} from "@tanstack/react-router";
import { IntlProvider } from "react-intl";
import { IModuleDefinition } from "..";

interface AppShellProps {
	moduleDefinitions: IModuleDefinition[];
	withoutLogin?: boolean;
}

export const AppShell = (props: AppShellProps) => {
	const [usersLocale, setUsersLocale] = React.useState(true);
	const [loggedIn, setLoggedIn] = React.useState(false);

	if (!(props.withoutLogin || loggedIn)) {
		return (
			<button type="button" onClick={() => setLoggedIn(true)}>
				Login
			</button>
		);
	}

	const rootRoute = createRouteConfig({
		component: () => (
			<>
				<div>
					{props.moduleDefinitions.map((module) => (
						<Link key={module.routes[0].path} to={`/${module.routes[0].path}`}>
							{module.name}
							{"  |  "}
						</Link>
					))}
				</div>
				<hr />
				<button onClick={() => setUsersLocale((value) => !value)}>
					Change Language
				</button>
				<hr />
				<Outlet />
			</>
		),
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
		<IntlProvider locale={usersLocale ? "sv" : "en"} messages={translations}>
			<RouterProvider router={router} />
		</IntlProvider>
	);
};
