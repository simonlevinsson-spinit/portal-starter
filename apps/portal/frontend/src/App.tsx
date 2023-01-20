import { InvoiceModule } from "invoice";
import React from "react";
import { RentalModule } from "rental";
import { AppShell } from "shell";
function App() {
	return <AppShell moduleDefinitions={[InvoiceModule, RentalModule]} />;
}

export default App;
