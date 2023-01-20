import React from "react";

export const Header = ({ title: title }: { title: string }) => {
	return <h1 className="text-6xl font-semibold font-display">{title}</h1>;
};
