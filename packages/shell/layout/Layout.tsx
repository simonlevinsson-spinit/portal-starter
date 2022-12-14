import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Link, Outlet } from "@tanstack/react-router";
import React from "react";
import { AppShellProps } from "../app-shell/AppShell";
import { SignInButton } from "../authorization/SignInButton";
import { SignOutButton } from "../authorization/SignOutButton";

interface LayoutProps extends AppShellProps {
	setUsersLocale: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Layout = (props: LayoutProps) => {
	const isAuthenticated = useIsAuthenticated();
	const { accounts } = useMsal();
	return (
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
			<button onClick={() => props.setUsersLocale((value: boolean) => !value)}>
				Change Language
			</button>
			{!(props.withoutLogin || isAuthenticated) && <SignInButton />}
			{isAuthenticated && accounts.length && (
				<div>
					{" "}
					<SignOutButton /> Logged in as {accounts[0].username}
				</div>
			)}
			<hr />
			<Outlet />
		</>
	);
};
