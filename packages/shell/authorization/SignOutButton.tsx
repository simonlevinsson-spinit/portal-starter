import React from "react";
import { useMsal } from "@azure/msal-react";

/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButton = () => {
	const { instance } = useMsal();

	const handleLogout = (logoutType: "redirect") => {
		if (logoutType === "redirect") {
			instance.logoutRedirect({
				postLogoutRedirectUri: "/",
			});
		}
	};

	return (
		<button onClick={() => handleLogout("redirect")}>
			Sign out using Redirect
		</button>
	);
};
