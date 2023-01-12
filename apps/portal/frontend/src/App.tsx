import { InvoiceModule } from "invoice";
import React from "react";
import { RentalModule } from "rental";
import { AppShell } from "shell";
import { CoolModule } from "my-module-app";

function App() {
	return <AppShell moduleDefinitions={[InvoiceModule, RentalModule, CoolModule]} />;
}

export default App;
