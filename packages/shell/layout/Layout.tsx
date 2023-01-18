import React from "react";
import { Link } from "react-router-dom";
import { AppShellProps } from "../app-shell/AppShell";

interface LayoutProps extends AppShellProps {
	setUsersLocale: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
	return (
		<>
			<div>
				{props.moduleDefinitions.map((module) => (
					<Link key={module.routes[0].path} to={`${module.routes[0].path}`}>
						{module.name}
						{"  |  "}
					</Link>
				))}
			</div>
			<hr />
			<button onClick={() => props.setUsersLocale((value: boolean) => !value)}>
				Change Language
			</button>
			<hr />
			{props.children}
		</>
	);
};
