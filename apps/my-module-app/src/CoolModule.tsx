import { IModuleDefinition } from "shell";
import React from 'react';

export const CoolModule: IModuleDefinition = {
	name: "Cool Module",
	translations: { en: {}, sv: {} },
	routes: [
		{
			path: "/cool-module",
			component: () => <h1>Cool Module</h1>,
		},
	],
};
